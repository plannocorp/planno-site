import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    viewport: { width: 1440, height: 1000 },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } : {},
    trace: 'retain-on-failure',
  },
  webServer: [
    { command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4321 --strictPort', url: 'http://127.0.0.1:4321', reuseExistingServer: !process.env.CI },
    { command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4322 --strictPort', url: 'http://127.0.0.1:4322', reuseExistingServer: !process.env.CI },
  ],
})
