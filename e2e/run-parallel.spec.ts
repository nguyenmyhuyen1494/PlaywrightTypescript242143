import { test, expect } from '@playwright/test';

test.describe('SmokeTesting', () => {

  // Test 1
  test('Test 1', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
  });

  // Group RegressionTesting
  test.describe('RegressionTesting', () => {

    // Test 2
    test('Test 2', async ({ page }) => {
      await page.goto('https://example.com');
      await expect(page).toHaveTitle('Example Domain');
    })

    // Test 3
    test('Test 3', async ({ page }) => {
      await page.goto('https://example.com');
      await expect(page).toHaveTitle('Example Domain');
    });
  }); // <-- đóng describe RegressionTesting

  // Test 4
  test('Test 4', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domains');
  });
}); // <-- đóng describe SmokeTesting
