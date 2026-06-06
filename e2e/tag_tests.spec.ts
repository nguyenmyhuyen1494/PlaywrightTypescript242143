import { test, expect } from '@playwright/test';

test('Login test @Smoke', async ({ page }) => {
  await page.goto('https://example.com');
});

test('Signup test @Regression', async ({ page }) => {
  await page.goto('https://example.com/signup');
});

test('Profile test @Sanity', async ({ page }) => {
  await page.goto('https://example.com/profile');
});
