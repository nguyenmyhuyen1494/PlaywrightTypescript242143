import { test, expect } from '@playwright/test';

test('Read ENV file', async ({ page }) => {

  await test.step('Navigating to URL', async () => {

    const url = process.env.PRACTICE_URL;

  await page.goto(url!);

//Left button click
 await page.getByRole('link',{name: 'Accordion'}).click({button:'left'});

//Right button click
 await page.getByRole('link',{name: 'Accordion'}).click({button:'right'});

 //Middle button click
 await page.getByRole('link',{name: 'Accordion'}).click({button:'middle'});

 //Mouse hover
 await page.getByRole('link',{name: 'Accordion'}).hover();

 //Double click
    await page.getByRole('link',{name: 'Accordion'}).dblclick();
    });
  });