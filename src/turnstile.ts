// Cloudflare Turnstile config (turnstile-spin). Widget for
// "mbrosveneers-website" registered for localhost, 127.0.0.1, and
// mbrosveneers.com. Every form now requires a phone number, so every
// submission's token is verified exactly once, server-side, by
// POST /public/leads -- nothing in the browser verifies it separately.

export const TURNSTILE_SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? '';
