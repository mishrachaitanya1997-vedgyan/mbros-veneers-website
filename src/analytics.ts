// GA4 (gtag.js) -- loaded lazily and only when VITE_GA_MEASUREMENT_ID is set.
// It's a script tag pointing at Google's own CDN (googletagmanager.com), so
// it costs nothing against this site's hosting/bandwidth and is free to use.
// Every function below no-ops when the env var is absent (e.g. local dev),
// so nothing needs to check "is analytics configured" at call sites.

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? '';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Call once on app mount. */
export function initAnalytics(): void {
  if (initialized || !MEASUREMENT_ID || typeof window === 'undefined') return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  // This is a client-routed SPA (History API, no full page reloads), so the
  // automatic pageview `config` would send would only ever fire once, for
  // the entry route. Page views are sent manually per navigation instead
  // (see trackPageView, called from App's route-change effect).
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path: string): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params ?? {});
}
