// Read-only client for the MONE public catalogue API. The website only ever
// calls /public/* endpoints (unauthenticated, edge-cached ~60s); when
// VITE_API_URL is unset or a fetch fails, callers fall back to bundled content
// so the site never depends on the API being up.

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
