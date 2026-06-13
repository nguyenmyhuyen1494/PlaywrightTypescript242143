import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './e2e',

  fullyParallel: false,   // máy yếu -> tắt parallel
  workers: 1,             // chỉ 1 worker cho nhẹ

  forbidOnly: isCI,
  retries: isCI ? 1 : 0,

  timeout: 60000,

  reporter: [
    ['html', { outputFolder: 'test-report', open: 'never' }],
    ['line'],
    ['allure-playwright'],
  ],

  use: {
    browserName: 'chromium',  // CHỈ CHROMIUM (nhẹ nhất)
    headless: true,           // CI + máy yếu

    screenshot: 'only-on-failure',
    video: 'off',             // tắt video để nhẹ
    trace: 'off',             // tắt trace để nhẹ

    actionTimeout: 30000,
    navigationTimeout: 30000,
  },
});