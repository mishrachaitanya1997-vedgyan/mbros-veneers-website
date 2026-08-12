/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the MONE CMS API, e.g. https://api.mbrosveneers.com */
  readonly VITE_API_URL?: string;
  /** Cloudflare Turnstile sitekey (public) for the "mbrosveneers-website" widget. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** GA4 Measurement ID, e.g. G-XXXXXXXXXX. Analytics is skipped entirely when unset. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
