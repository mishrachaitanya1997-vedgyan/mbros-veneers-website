import type { CategoryPage, Faq, SeoHome, SiteSettings } from './types';

// Small DOM helpers to keep SEO in sync with editable CMS content. The site is a
// client-rendered SPA, so we update <title>, meta, and JSON-LD at runtime
// (matching the existing imperative pattern in App.tsx). JSON-LD blocks that are
// content-driven are tagged with data-cms-id so we upsert rather than duplicate.

function setMetaByName(name: string, content: string): void {
  const el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (el) el.content = content;
}

function setMetaByProp(property: string, content: string): void {
  const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (el) el.content = content;
}

function setCanonical(href: string): void {
  const el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (el) el.href = href;
}

/** Create or replace a content-driven JSON-LD block identified by `id`. */
function upsertJsonLd(id: string, data: unknown): void {
  const selector = `script[type="application/ld+json"][data-cms-id="${id}"]`;
  let el = document.querySelector<HTMLScriptElement>(selector);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-cms-id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function localBusinessSchema(s: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: s.businessName,
    '@id': 'https://mbrosveneers.com/',
    url: 'https://mbrosveneers.com/',
    telephone: s.phone,
    email: s.email,
    priceRange: s.priceRange,
    hasMap: s.mapUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.locality,
      addressRegion: s.address.region,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.geo.latitude, longitude: s.geo.longitude },
    openingHoursSpecification: s.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
      ...(h.note ? { description: h.note } : {}),
    })),
    sameAs: s.instagramUrl ? [s.instagramUrl] : [],
  };
}

/**
 * Site-wide LocalBusiness structured data (address, phone, hours, socials).
 * Called on every route so editing Site Settings updates the schema everywhere,
 * replacing the previously-static block in index.html.
 */
export function applySiteStructuredData(settings: SiteSettings): void {
  upsertJsonLd('local-business', localBusinessSchema(settings));
}

/** Homepage SEO + FAQ structured data, all editable from the CMS. */
export function applyHomeSeo(seo: SeoHome, settings: SiteSettings, faqs: Faq[]): void {
  document.title = seo.title;
  setMetaByName('description', seo.description);
  if (seo.keywords) setMetaByName('keywords', seo.keywords);
  setCanonical(seo.canonical);
  setMetaByProp('og:url', seo.canonical);
  setMetaByProp('og:title', seo.title);
  setMetaByProp('og:description', seo.description);
  if (seo.ogImage) setMetaByProp('og:image', seo.ogImage);
  setMetaByName('twitter:title', seo.title);
  setMetaByName('twitter:description', seo.description);
  if (seo.ogImage) setMetaByName('twitter:image', seo.ogImage);
  applySiteStructuredData(settings);
  upsertJsonLd('home-faq', faqPageSchema(faqs));
}

/** Category page (burl/teak/oak) SEO + FAQ structured data. */
export function applyCategorySeo(page: CategoryPage): void {
  document.title = page.title;
  setCanonical(page.canonical);
  setMetaByProp('og:title', page.ogTitle);
  setMetaByProp('og:description', page.ogDesc);
  setMetaByProp('og:url', page.canonical);
  upsertJsonLd('category-faq', faqPageSchema(page.faqs));
}
