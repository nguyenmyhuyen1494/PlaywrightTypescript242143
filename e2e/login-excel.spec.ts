import { test, expect } from "@playwright/test";
import { readExcelFile } from "../src/utils/excelReader";

test('Login using Excel data', async ({ page }) => {
    // Đọc Excel
    const excelData = readExcelFile("test-data/qa/account.xlsx", "Sheet1");

    // Lấy dòng đầu tiên
    const user = excelData[0];
    const username = user.Username;
    const password = user.Password;

    console.log("Login with:", username, password);

    // Điều hướng vào trang login
    await page.goto("https://www.saucedemo.com/");

    // Điền username + password
    await page.fill("#user-name", username);
    await page.fill("#password", password);

    // Click login
    await page.click("#login-button");

    // Kiểm tra login thành công
    await expect(page.locator(".inventory_list")).toBeVisible();
});
