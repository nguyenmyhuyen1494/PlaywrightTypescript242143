import {test, expect} from '../../src/utils/fixture/TestFixture';

import { HomePage } from '../../src/utils/pages/HomePage';

test('POM Example Test', async ({ page }) => {
    console.log(`Test execution started...`)
    const homePage = new HomePage(page);

    const url = process.env.GOOGLE_URL;
    const keyword = process.env.SEARCH_KEYWORD;

// url! and keyword! are used to assert that these values are not null or undefined
    await homePage.goToURL(url!);
    await homePage.enterSearchText(keyword!);
    await expect(page).toHaveURL(/search/);

    console.log(`Test execution ended...`)
});
