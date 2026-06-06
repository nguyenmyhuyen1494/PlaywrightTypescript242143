import { test, expect } from '@playwright/test';

test('Handle drag drop', async ({ page }) => {

  await test.step('Navigating to URL', async () => {

  await page.goto('https://jqueryui.com/droppable/');

  const frame = page.frameLocator('.demo-frame');
  //drag element, drop element
  const drag = frame.locator('#draggable');
    const drop = frame.locator('#droppable');
    await drag.dragTo(drop);
    
    });
  });