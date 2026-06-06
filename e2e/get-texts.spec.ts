import { test, expect } from '@playwright/test';

test('get text', async ({ page }) => {
    await page.goto('https://github.com/BakkappaN');
   const text = page.locator(`//span[contains(text(), "Testers Talk")]`);
   const tent = await text.textContent();
          console.log('Text:', tent);
   

})


// test('get text2', async ({ page }) => {
//     await page.goto('https://github.com/BakkappaN');
//    const text = page.locator(`//span[contains(text(), "Testers Talk")]`);
//    const tent = await text.innerText();
//           console.log('Text2:', tent);
   

// })