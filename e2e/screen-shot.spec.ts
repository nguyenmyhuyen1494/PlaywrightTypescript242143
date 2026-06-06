import { test, expect } from '@playwright/test';

test('take a screenshot', async ({ page }) => {
    await page.goto('https://example.com');
    await page.getByText('Example Domain').screenshot({ path: './screenshots/ElementScreenShot.png' });
    await page.screenshot({ path: './screenshots/ElementScreenShot2.png' });
});