import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { SiteContent } from './types';
import { DEFAULT_CONTENT } from './defaults';

// Base URL of the MONE CMS API, e.g. https://api.mbrosveneers.com. When unset
// (or the fetch fails) the site renders from bundled DEFAULT_CONTENT so it never
// depends on the API being up.
const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').replace(/\/$/, '');

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge CMS overrides onto defaults: plain objects merge key-by-key (so a
 * partial block still inherits defaults for missing fields), while arrays and
 * primitives from the override replace the default wholesale.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T));
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = deepMerge((base as Record<string, unknown>)[key], value);
  }
  return result as T;
}

const ContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export const useContent = (): SiteContent => useContext(ContentContext);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    if (!API_URL) return;
    const controller = new AbortController();
    fetch(`${API_URL}/public/site-content`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { content?: Partial<SiteContent> }) => {
        if (data && data.content) {
          setContent((prev) => deepMerge(prev, data.content));
        }
      })
      .catch(() => {
        // Keep defaults on any failure — the site stays fully functional offline.
      });
    return () => controller.abort();
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
