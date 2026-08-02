// Cloudflare Turnstile config (turnstile-spin). Widget for
// "mbrosveneers-website" registered for localhost, 127.0.0.1, and
// mbrosveneers.com; managed siteverify Worker deployed to
// turnstile-siteverify-mbrosveneers.

export const TURNSTILE_SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? '';

// Only used by EmailJS-backed forms, which have no server of their own to do
// this check -- see verifyTurnstileToken() below. The share-page enquiry form
// does NOT use this: its token goes straight into POST /public/leads, which
// verifies it server-side exactly once. A Turnstile token is single-use, so
// verifying it here first would burn it before that server-side check runs.
export const TURNSTILE_VERIFY_URL =
  (import.meta.env.VITE_TURNSTILE_VERIFY_URL as string | undefined) ?? '';

/**
 * Browser -> our managed siteverify Worker -> Cloudflare (never browser -> Cloudflare
 * directly, which would require exposing the secret). Returns false on any
 * network failure or non-success response, so callers fail closed.
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!TURNSTILE_VERIFY_URL) return false;
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
