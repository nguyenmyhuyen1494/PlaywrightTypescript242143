import {test, expect} from '@playwright/test';
test('Handle prompt popup', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
    page.on('dialog', async (dialog) => {
      console.log('Prompt message:', dialog.message());
      await dialog.accept('Playwright'); // send text input
    });
  
    await page.getByText('Click for JS Prompt').click();
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
  });
  