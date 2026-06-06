import { test, expect } from '@playwright/test';

test('test webmanager', async ({ page }) => {

  await test.step('Navigating to URL', async () => {

  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  });

  await test.step('Filling login form', async () => {
  await page.getByRole('textbox', { name: 'Username or email address' }).click();
  await page.getByRole('textbox', { name: 'Username or email address' }).fill('hello');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('ư242143');
  });

  await test.step('Submitting login form', async () => {
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  });

  await test.step('Checking error message', async () => {
  await expect(page.getByText('This account does not support password sign-in, please try another sign-in method or account recovery.')).toBeVisible();
  });
});