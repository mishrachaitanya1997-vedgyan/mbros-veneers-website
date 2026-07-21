import type { SiteSettings } from './siteSettings';

// Small DOM helpers to keep SEO in sync as routes change. The site is a
// client-rendered SPA, so we update <title>, meta, and JSON-LD at runtime.

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

/** Site-wide LocalBusiness structured data (address, phone, hours, socials). */
export function applySiteStructuredData(settings: SiteSettings): void {
  upsertJsonLd('local-business', localBusinessSchema(settings));
}

/** Per-route title/canonical/OG tags for a veneer category page. */
export function applyCategorySeo(page: { title: string; canonical: string; ogTitle: string; ogDesc: string }): void {
  document.title = page.title;
  setCanonical(page.canonical);
  setMetaByProp('og:title', page.ogTitle);
  setMetaByProp('og:description', page.ogDesc);
  setMetaByProp('og:url', page.canonical);
}
