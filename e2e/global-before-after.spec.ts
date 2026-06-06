import { test, expect } from '../src/utils/fixture/TestFixture';

test('Check page title', async ({ page }) => {
  await expect(page).toHaveTitle('Example Domain');
});

test('Check heading text', async ({ page }) => {
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Example Domain');
});
