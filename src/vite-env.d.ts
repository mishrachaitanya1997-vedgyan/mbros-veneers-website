/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the MONE CMS API, e.g. https://api.mbrosveneers.com */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
