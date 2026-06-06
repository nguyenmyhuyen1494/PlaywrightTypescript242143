import { test, expect } from '@playwright/test';

test('Handle date picker', async ({ page }) => {
  await test.step('Navigating to URL', async () => {


    await page.goto('https://jqueryui.com/datepicker/');

    const frame = page.frameLocator('.demo-frame');
    const prevBtn = frame.locator('.ui-datepicker-prev');
    const nextBtn = frame.locator('.ui-datepicker-next');
    const datePickerInput = frame.locator('#datepicker');
    const date = frame.locator('//a[text()="15"]');


    // Click date input field
 
    await datePickerInput.click();

    // Click next month button
    await nextBtn.click();

    // Select day 15
    await date.click();

    //refresh page
    await page.reload();

    //Click previous month button
    // Click date input field
    await datePickerInput.click();

    // Click previous month button
    await prevBtn.click();

    // Select day 15
    await date.click();

  });
});