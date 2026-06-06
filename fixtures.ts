import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';

// ⚙️ Extend test để auto attach video, screenshot, trace
export const test = base.extend({
  page: async ({ page }, use) => {
    await use(page);

    // Attach video
    const videoPath = await page.video()?.path();
    if (videoPath) {
      await allure.attachment('Test Video', videoPath, 'video/webm');
    }

    // Attach screenshot (nếu có)
    try {
      const screenshot = await page.screenshot({ fullPage: true });
      await allure.attachment('Screenshot', screenshot, 'image/png');
    } catch (e) {
      console.log('No screenshot captured:', e);
    }

    // Attach trace (nếu bật)
    const tracePath = test.info().outputPath('trace.zip');
    await allure.attachment('Trace', tracePath, 'application/zip');
  },
});