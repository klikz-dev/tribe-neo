/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRIBE_GQL_ENDPOINT: string
  readonly VITE_PORTAL_AUTHORIZED_REDIRECT_URL: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
