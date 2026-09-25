import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const api = env.VITE_PLATFORM_API_BASE_URL
  if (mode === 'production' && api) {
    const url = new URL(api)
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
      throw new Error('VITE_PLATFORM_API_BASE_URL must be a public HTTPS API URL without credentials, query or fragment')
    }
  }
  return {
    base: '/',
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          site: fileURLToPath(new URL('./index.html', import.meta.url)),
          superadmin: fileURLToPath(new URL('./superadmin/index.html', import.meta.url)),
        },
      },
    },
    server: {
      proxy: { '/api': { target: env.API_PROXY_TARGET || 'http://localhost:8080', changeOrigin: true } },
    },
  }
})
