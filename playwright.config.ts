import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    env: {
      DATABASE_URL: process.env.DATABASE_URL || '',
      DIRECT_URL: process.env.DIRECT_URL || '',
      STORAGE_TYPE: process.env.STORAGE_TYPE || 'local',
      IP_HASH_SALT: process.env.IP_HASH_SALT || 'playwright-local-salt',
      NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN:
        process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN || '',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
