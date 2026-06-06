import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly searchBox: Locator;

    constructor(page: Page) {
        this.page = page;

        // Elements
        this.searchBox = page.locator('input[name="q"], textarea[name="q"]');
    }

    async goToURL(url: string) {
        await this.page.goto(url);
    
    }

    async enterSearchText(keyword: string) {

        await this.searchBox.waitFor({ state: 'visible' });
        await this.searchBox.fill(keyword);
        await this.searchBox.press('Enter');
    }
}
