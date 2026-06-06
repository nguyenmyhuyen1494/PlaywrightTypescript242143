import { test, expect } from '@playwright/test';

test('Validate YouTube playlist page title', async ({ page }) => {
  // Go to Google
  await page.goto('https://www.github.com/');

await page.getByRole('link', { name: 'Sign up' }).click();
await page.getByRole('textbox', { name: 'Email2' }).click();
await page.getByRole('textbox', { name: 'Email2' }).fill('helloworld2424@gmail.com');
await page.getByRole('textbox', { name: 'Password' }).fill('242143');

});
