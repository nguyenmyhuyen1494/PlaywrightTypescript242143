import { test, expect } from '@playwright/test';

test('Handle drag drop', async ({ page }) => {

  await test.step('Navigating to URL', async () => {

  await page.goto('https://jqueryui.com/droppable/');

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