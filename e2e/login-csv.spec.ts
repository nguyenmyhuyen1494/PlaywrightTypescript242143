// Import Playwright test và expect để viết test và assertion
import { test, expect } from '@playwright/test';

// Import module fs Node js để đọc file từ ổ đĩa
import * as fs from 'fs';

// Import hàm parse để chuyển CSV → array object
import { parse } from 'csv-parse/sync';

// Khai báo kiểu dữ liệu Typescript cho mỗi dòng trong file CSV
type Account = {
  username: string;       // tên đăng nhập
  password: string;       // mật khẩu
  expectSuccess: string;  // giá trị "true" hoặc "false" từ CSV
};

// Đọc nội dung file CSV (đọc dưới dạng text UTF-8)
const csvData = fs.readFileSync('./test-data/qa/account.csv', 'utf-8');

// Chuyển CSV thành mảng object array theo type Account
const records: Account[] = parse(csvData, {
  columns: true,          // dòng đầu tiên sẽ dùng làm tên trường
  skip_empty_lines: true, // bỏ qua dòng trống trong CSV
});

// Tạo nhóm test có tên "SauceDemo Login with CSV"
test.describe('SauceDemo Login with CSV', () => {

  // Lặp qua từng dòng CSV — mỗi dòng tạo ra 1 test case
  for (const record of records) {

    // Tên test động để biết đang test user nào
    test(`Login Test – ${record.username}`, async ({ page }) => {

      // Chuyển trường expectSuccess ("true"/"false") → boolean
      const shouldPass =
        record.expectSuccess.trim().toLowerCase() === 'true';

      // Mở trang đăng nhập thật của SauceDemo
      await page.goto('https://www.saucedemo.com/');

      // Điền username vào ô nhập liệu
      await page.locator('#user-name').fill(record.username);

      // Điền password vào ô nhập liệu
      await page.locator('#password').fill(record.password);

      // Click nút Login
      await page.locator('#login-button').click();

      // Nếu dòng CSV mong đợi đăng nhập thành công
      if (shouldPass) {
        // Kiểm tra URL chuyển về inventory.html
        await expect(page).toHaveURL(/.*inventory.html/);

        // Kiểm tra title "Products" xuất hiện
        await expect(page.locator('.title')).toHaveText('Products');
      }

      // Nếu mong đợi đăng nhập thất bại
      else {
        // Lấy lỗi message box của trang
        const errorBox = page.locator('[data-test="error"]');

        // Kiểm tra hộp lỗi xuất hiện
        await expect(errorBox).toBeVisible();

        // Kiểm tra nội dung chứa chữ "Epic sadface" (đúng như website)
        await expect(errorBox).toContainText('Epic sadface');
      }
    });
  }
});
