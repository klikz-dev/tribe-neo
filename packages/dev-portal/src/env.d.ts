/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRIBE_GQL_ENDPOINT: string
  readonly VITE_DEV_PORTAL_UNAUTHORIZED_REDIRECT_URL: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
