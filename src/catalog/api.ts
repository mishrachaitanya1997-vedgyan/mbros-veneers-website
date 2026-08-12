// Read-only client for the MONE public catalogue API. The website only ever
// calls /public/* endpoints (unauthenticated, edge-cached ~60s); when
// VITE_API_URL is unset or a fetch fails, callers fall back to bundled content
// so the site never depends on the API being up.

import type { Attribution } from '../attribution';

const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');

export type CatalogCategory = {
  id: string; // slug — doubles as the /veneers/<id> path and products' veneerType
  title: string;
  description: string;
  image: string;
  tag: string;
  inventoryCategory: string;
  href: string;
  productCount: number;
};

export type CatalogProduct = {
  lotId: string;
  title?: string;
  tag?: string;
  lotNo?: string;
  veneerType?: string | null;
  catalogueCategoryId?: string | null;
  slug?: string;
  description?: string;
  primaryImageUrl?: string | null;
  imageUrls?: string[];
  saleRatePerSqM?: number | null;
  availableQuantity?: number;
  lengthM?: number | null;
  widthM?: number | null;
  deliveryEtaDays?: string;
};

// One in-flight/settled promise per path — the API's own 60s cache handles
// freshness; this just deduplicates requests across SPA navigations.
const cache = new Map<string, Promise<unknown>>();

function getJson<T>(path: string): Promise<T> {
  if (!API_URL) return Promise.reject(new Error('VITE_API_URL not configured'));
  let pending = cache.get(path);
  if (!pending) {
    pending = fetch(`${API_URL}${path}`).then((res) =>
      res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))
    );
    pending.catch(() => cache.delete(path));
    cache.set(path, pending);
  }
  return pending as Promise<T>;
}

export function fetchCatalogCategories(): Promise<CatalogCategory[]> {
  return getJson<{ categories?: CatalogCategory[] }>('/public/catalog/categories').then(
    (data) => data.categories ?? []
  );
}

export function fetchCatalogProducts(category?: string): Promise<CatalogProduct[]> {
  const suffix = category ? `?category=${encodeURIComponent(category)}` : '';
  return getJson<{ products?: CatalogProduct[] }>(`/public/catalog/products${suffix}`).then(
    (data) => data.products ?? []
  );
}

// --- Design Partner project shares -----------------------------------------
// A partner (architect/designer) sends their client one of these links. The
// board is curated (only the products the partner saved) and read-only; the
// enquiry form at the bottom is what attributes the resulting CRM lead back
// to the partner via the share token.

export type SharedProjectItem = {
  lotId: string;
  title: string;
  shadeFamily?: string | null;
  finish?: string | null;
  variantCode?: string | null;
  sellingPricePerSqM?: number | null;
  stockStatus: string;
  primaryImageUrl?: string | null;
  imageUrls?: string[];
};

export type SharedProject = {
  project: { name: string; clientLabel?: string | null; siteLocation?: string | null; notes?: string | null };
  partner: { name: string; firmName?: string | null };
  seller: { name: string; legal_name?: string | null; phone?: string | null; email?: string | null; address?: string | null };
  items: SharedProjectItem[];
};

// Deliberately bypasses the getJson cache: revoking a link must take effect
// on next load, not after some in-memory promise expires.
export async function fetchProjectShare(token: string): Promise<SharedProject> {
  if (!API_URL) throw new Error('VITE_API_URL not configured');
  const res = await fetch(`${API_URL}/public/project-share/${encodeURIComponent(token)}`);
  if (!res.ok) throw new Error(res.status === 404 ? 'not_found' : `HTTP ${res.status}`);
  return res.json();
}

/**
 * Creates a real CRM lead (source='website') from a general site form
 * (Enquiry dialog, Contact section, Appointment dialog). Requires a phone
 * number -- the CRM dedupes contacts on phone everywhere, so a lead with no
 * phone has nothing to attach to. Callers with an optional phone field
 * should only call this when the visitor actually provided one; there is no
 * server-side fallback for a missing phone.
 *
 * Like submitSharedProjectEnquiry, botToken is verified server-side exactly
 * once by POST /public/leads -- do not pre-verify it client-side first.
 */
export async function submitPublicLead(input: {
  name: string;
  phone: string;
  email?: string;
  projectName?: string;
  message: string;
  botToken: string;
  attribution?: Attribution;
}): Promise<void> {
  if (!API_URL) throw new Error('VITE_API_URL not configured');
  const res = await fetch(`${API_URL}/public/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      email: input.email || undefined,
      projectName: input.projectName || undefined,
      message: input.message,
      botToken: input.botToken,
      ...attributionPayload(input.attribution),
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function submitSharedProjectEnquiry(input: {
  shareToken: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  /**
   * Cloudflare Turnstile token. Sent straight through to POST /public/leads,
   * which verifies it server-side exactly once (see public-lead-verifier.ts).
   * Deliberately NOT pre-verified client-side here -- a Turnstile token is
   * single-use, so checking it in the browser first would burn it before the
   * server-side check runs, and the real submission would then always fail.
   */
  botToken: string;
  attribution?: Attribution;
}): Promise<void> {
  if (!API_URL) throw new Error('VITE_API_URL not configured');
  const res = await fetch(`${API_URL}/public/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      email: input.email || undefined,
      message: input.message,
      shareToken: input.shareToken,
      botToken: input.botToken,
      ...attributionPayload(input.attribution),
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function attributionPayload(attribution?: Attribution) {
  if (!attribution) return {};
  return {
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    landingPage: attribution.landingPage,
    referrerHost: attribution.referrerHost,
  };
}
