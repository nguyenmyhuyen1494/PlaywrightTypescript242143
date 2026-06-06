import { test, expect } from '@playwright/test';

test('Handle dropdown list', async ({ page }) => {

  await test.step('Navigating to URL', async () => {

  await page.goto('https://www.facebook.com/');

  await page.getByRole('button', { name: 'Create new account' }).click();

  });

  await test.step('Select dropdownlist using text', async () => {
    await page.getByLabel('Month').selectOption('Aug');

  
  });
  // await test.step('Validate dropdown list', async () => {
    // await expect(page.locator('#month option')).toHaveText(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

    
    await test.step('Validate dropdown list options', async () => {
      const options = await page.locator('#month option').allTextContents();
      console.log(options);
  
      // Check that the expected items exist
      expect(options).toEqual(
        expect.arrayContaining(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
      );
    
    });
  });