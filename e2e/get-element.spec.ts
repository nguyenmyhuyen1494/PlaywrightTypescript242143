import { test, expect } from '@playwright/test';

test('get element', async ({ page }) => {
    await page.goto('https://github.com/BakkappaN');
    // await page.getByAltText("View BakkappaN's full-sized avatar").click();
    //     })
    const searchButton = page.locator('//button[@aria-label="Search or jump to…"]');
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    const search = page.locator('//input[@id="query-builder-test"]');
    await expect(search).toBeVisible();
    await search.click();
    await page.locator('//input[@id="query-builder-test"]').fill('hello');

})