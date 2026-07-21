// Static business info — previously the CMS-editable `site.settings` block.
// The website module no longer manages this from the app; it's frozen here as
// plain constants. Keep in sync with the business's actual contact details.

export type SiteSettings = {
  businessName: string;
  phone: string; // dialable, e.g. +919922166866
  phoneDisplay: string; // e.g. +91 99221 66866
  email: string;
  instagramUrl: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    full: string;
  };
  geo: { latitude: number; longitude: number };
  priceRange: string;
  hours: { days: string[]; opens: string; closes: string; note?: string }[];
};

export const SITE_SETTINGS: SiteSettings = {
  businessName: 'M Bros Veneers',
  phone: '+919922166866',
  phoneDisplay: '+91 99221 66866',
  email: 'info@mbrosveneers.com',
  instagramUrl: 'https://www.instagram.com/mbrosveneers',
  address: {
    street: '81, Queta Colony, Lakadganj',
    locality: 'Nagpur',
    region: 'Maharashtra',
    postalCode: '440008',
    country: 'IN',
    full: '81, Queta Colony, Lakadganj, Nagpur – 440008',
  },
  geo: { latitude: 21.1465, longitude: 79.1121 },
  priceRange: '₹₹₹',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '20:00' },
    { days: ['Sunday'], opens: '00:00', closes: '00:00', note: 'By appointment only' },
  ],
};
