import { test, expect } from '@playwright/test';

test('Handle alert popup', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Listen for the alert dialog
  page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.accept(); // or dialog.dismiss()
  });

  // Trigger the alert
  await page.getByText('Click for JS Alert', {exact : true}).click();

  // Verify the result text after accept alert
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});