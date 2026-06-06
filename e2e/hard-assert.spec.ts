import { test, expect } from '@playwright/test';

test('Handle hard assertion in Playwright', async ({ page }) => {
  await test.step('Navigating to URL', async () => {

    await page.goto('https://www.youtube.com/');

    //visible, editable, enabled, emty

    // const searchInput = page.getByPlaceholder('Search');
    await expect(page.getByPlaceholder('Search', { exact: true }).first()).toBeVisible();
    await expect(page.getByPlaceholder('Search', { exact: true }).first()).toBeEditable();
    await expect(page.getByPlaceholder('Search', { exact: true }).first()).toBeEnabled();
    await expect(page.getByPlaceholder('Search', { exact: true }).first()).toBeEmpty();
    await expect(page.getByPlaceholder('Search')).toBeVisible();

    //Verify URL, title, text

    await page.getByPlaceholder('Search', { exact: true }).first().click();
    await page.getByPlaceholder('Search', { exact: true }).first().fill('playwright by tester talk');
    await page.getByPlaceholder('Search', { exact: true }).first().press('Enter');
    await expect(page).toHaveURL('https://www.youtube.com/results?search_query=playwright+by+tester+talk');
    await expect(page).toHaveTitle(/.*playwright by tester talk.*/);
    await expect(page.getByRole('link', { name: 'Testers Talk', exact: true }).first()).toBeVisible();


  });
});