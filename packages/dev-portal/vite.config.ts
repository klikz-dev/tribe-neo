import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const port = Number(process.env.PORT) || 3000
const mode = process.env.NODE_ENV

// https://vitejs.dev/config/
export default defineConfig({
  plugins:
    mode === 'production'
      ? [tsconfigPaths()]
      : [tsconfigPaths(), reactRefresh()],
  server: {
    port,
  },
  esbuild: {
    jsxFactory: '_jsx',
    jsxFragment: '_jsxFragment',
    jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from 'react'`,
  },
  envPrefix: 'VITE_',
  base: mode === 'production' ? process.env.PUBLIC_PATH : '/',
})
