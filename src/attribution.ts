// First-touch marketing attribution. Captured in localStorage so it survives
// across pages until the visitor eventually submits an enquiry, then replayed
// on that submission. Sent to POST /public/leads as flat strings -- matches the
// shape stored on the `leads` table (utm_source, ... , landing_page,
// referrer_host).
//
// "First touch" means the first *campaign* touch, not merely the first page
// view. A plain `if (alreadyStored) return` looks like first-touch but is not:
// most visitors land organically first, which would store a record with no
// campaign data and then permanently block the real campaign click that
// follows. Every ad-driven enquiry from a returning visitor would report as
// untracked. So a stored record is treated as final only once it actually
// carries campaign data; until then a later UTM-bearing visit upgrades it.

// v2: v1 records were written by the buggy version above and are frequently
// empty of campaign data. Bumping the key discards them rather than letting a
// stale, useless first touch outrank a real one.
const STORAGE_KEY = 'mbros_attribution_v2';

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrerHost?: string;
};

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as Attribution;
  } catch {
    return null;
  }
}

function safeHost(url: string): string | undefined {
  try {
    return new URL(url).host || undefined;
  } catch {
    return undefined;
  }
}

/** True when the record identifies a marketing campaign, not just a page view. */
function hasCampaign(a: Attribution | null): boolean {
  if (!a) return false;
  return Boolean(
    a.utmSource || a.utmMedium || a.utmCampaign || a.utmContent || a.utmTerm,
  );
}

function readCurrentVisit(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const referrerHost = document.referrer ? safeHost(document.referrer) : undefined;
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmContent: params.get('utm_content') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    landingPage: window.location.pathname || undefined,
    // Ignore self-referrals: an internal link is not an acquisition source.
    referrerHost:
      referrerHost && referrerHost !== window.location.host ? referrerHost : undefined,
  };
}

/**
 * Call once on app mount.
 *
 * - No campaign stored yet, this visit has one -> record this visit (upgrade).
 * - No campaign stored yet, this visit has none -> keep the earliest landing
 *   page/referrer so an organic enquiry still reports where it came from.
 * - Campaign already stored -> never overwritten. That is the first touch.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const stored = readStored();
  if (hasCampaign(stored)) return;

  const visit = readCurrentVisit();

  // Nothing worth upgrading to: preserve the existing organic record rather
  // than rewriting its landing page on every subsequent page view.
  if (stored && !hasCampaign(visit)) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visit));
  } catch {
    // Private browsing / storage disabled -- attribution is best-effort only.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  // Fall back to the current visit when storage is unavailable (private mode,
  // storage blocked) so a campaign click still attributes within that session.
  return readStored() ?? readCurrentVisit();
}
