import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests_e2e',
  use: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    headless: true,
  },
});