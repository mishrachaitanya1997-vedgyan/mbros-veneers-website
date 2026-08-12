// First-touch marketing attribution. Captured once per browser (localStorage)
// on the visitor's first landing so it survives across pages until they
// eventually submit an enquiry, then replayed on that submission. Sent to
// POST /public/leads as flat strings -- matches the shape stored on the
// `leads` table (utm_source, utm_medium, ... , landing_page, referrer_host).

const STORAGE_KEY = 'mbros_attribution_v1';

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
    return raw ? (JSON.parse(raw) as Attribution) : null;
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

/** Call once on app mount. No-ops on every later visit once first-touch is stored. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  if (readStored()) return;
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmContent: params.get('utm_content') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    landingPage: window.location.pathname || undefined,
    referrerHost: document.referrer ? safeHost(document.referrer) : undefined,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Private browsing / storage disabled -- attribution is best-effort only.
  }
}

export function getAttribution(): Attribution {
  return readStored() ?? {};
}
