import * as React from 'react';
import { useEffect, useId, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '@/src/turnstile';

const SCRIPT_ID = 'cf-turnstile-script';

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId?: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.getElementById(SCRIPT_ID)) {
      const check = () => (window.turnstile ? resolve() : setTimeout(check, 50));
      check();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile script'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget (turnstile-spin). Renders the managed challenge
 * and reports the resulting token via onToken; onToken(null) means the token
 * expired, errored, or the widget was reset -- callers must block submission
 * until a fresh non-null token arrives.
 */
export function TurnstileWidget({
  onToken,
  className,
}: {
  onToken: (token: string | null) => void;
  /** Extra classes for the wrapper, e.g. to centre the widget. */
  className?: string;
}) {
  const containerId = `turnstile-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(`#${containerId}`, {
          sitekey: TURNSTILE_SITE_KEY,
          action: 'turnstile-spin-v1',
          // Turnstile defaults to a dark widget, which reads as a harsh black
          // slab against this site's cream/white forms. Light matches the form
          // surface; the wrapper below softens the remaining hard edge.
          theme: 'light',
          callback: (token: string) => onToken(token),
          'expired-callback': () => onToken(null),
          'error-callback': () => onToken(null),
        });
      })
      .catch(() => onToken(null));
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  // The inner iframe has its own fixed corners, so the wrapper clips them with
  // overflow-hidden to get a consistent radius across browsers.
  return (
    <div
      id={containerId}
      className={[
        'inline-block overflow-hidden rounded-lg',
        'ring-1 ring-wood-light/30 shadow-sm',
        '[&_iframe]:block',
        className ?? '',
      ].join(' ')}
    />
  );
}
