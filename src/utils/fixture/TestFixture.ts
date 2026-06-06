import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export const test = base.extend<{ 
  globalHook: void ;
  homePage: HomePage;
}>({
  globalHook: [
    async ({ page }, use, testInfo) => {
      // 🌍 GLOBAL BEFORE EACH

      console.log(`🌍 Global beforeEach → ${testInfo.title}`);

      const url = process.env.GOOGLE_URL;

      await page.goto('https://example.com');

      // 👉 CHẠY TEST Ở ĐÂY
      await use();

      // 🌍 GLOBAL AFTER EACH
      console.log(`🌍 Global afterEach → ${testInfo.title}`);
    },
    { auto: true }],
homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect };
