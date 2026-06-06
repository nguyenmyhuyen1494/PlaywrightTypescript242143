import { test, expect } from '@playwright/test';

test('checkboxradio on jQuery UI demo', async ({ page }) => {
  await page.goto('https://jqueryui.com/checkboxradio/');

  // Vào trong iframe chứa nội dung demo
  const frame = page.frameLocator('.demo-frame');

  // --- RADIO: chọn "Paris" ---
  const parisLabel = frame.locator('label[for="radio-2"]');
  await parisLabel.click(); // click label thay vì input
  const radioParis = frame.locator('#radio-2');
  await expect(radioParis).toBeChecked();

  // --- CHECKBOX: chọn "4 Star" và "5 Star" ---
  const star4 = frame.locator('label[for="checkbox-3"]');
  const star5 = frame.locator('label[for="checkbox-4"]');

  await star4.click();
  await star5.click();

  const checkbox4 = frame.locator('#checkbox-3');
  const checkbox5 = frame.locator('#checkbox-4');
  await expect(checkbox4).toBeChecked();
  await expect(checkbox5).toBeChecked();

  // Bỏ chọn 4 Star
  await star4.click();
  await expect(checkbox4).not.toBeChecked();
});
