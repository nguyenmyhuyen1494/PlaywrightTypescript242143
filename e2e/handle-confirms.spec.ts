import { test, expect } from '../fixtures';

test('Handle confirm popup', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.on('dialog', async (dialog) => {
    console.log('Confirm message:', dialog.message());
    await dialog.accept(); // click OK
  });

  await page.getByText('Click for JS Confirm').click();
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
});
