/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the MONE CMS API, e.g. https://api.mbrosveneers.com */
  readonly VITE_API_URL?: string;
  /** Cloudflare Turnstile sitekey (public) for the "mbrosveneers-website" widget. */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  /** Managed siteverify Worker URL for EmailJS-backed forms (see src/turnstile.ts). */
  readonly VITE_TURNSTILE_VERIFY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
