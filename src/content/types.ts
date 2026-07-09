// Shape of the website content served by the MONE CMS
// (GET {VITE_API_URL}/public/site-content → { content: SiteContent }).
// Kept in sync with the API block schemas in
// apps/api/src/modules/website/website.repo.ts.

export type SiteSettings = {
  businessName: string;
  tagline: string;
  phone: string; // dialable, e.g. +919922166866
  phoneDisplay: string; // e.g. +91 99221 66866
  email: string;
  instagram: string; // handle without @
  instagramUrl: string;
  mapUrl: string;
  priceRange: string;
  logoUrl: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    full: string;
  };
  geo: { latitude: number; longitude: number };
  hoursDisplay: string;
  hours: { days: string[]; opens: string; closes: string; note?: string }[];
};

export type CollectionItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  href: string;
};

export type Collections = {
  heading: string;
  intro: string;
  items: CollectionItem[];
};

export type Faq = { q: string; a: string };

export type Faqs = { items: Faq[] };

export type CategoryItem = { title: string; tag: string; image: string };

export type CategoryPage = {
  title: string;
  h1: string;
  subtitle: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDesc: string;
  heroImage: string;
  items: CategoryItem[];
  faqs: Faq[];
};

export type SeoHome = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonical: string;
};

export type SiteContent = {
  site: { settings: SiteSettings };
  home: { collections: Collections; faqs: Faqs };
  pages: { burl: CategoryPage; teak: CategoryPage; oak: CategoryPage };
  seo: { home: SeoHome };
};
