import { test, expect } from '@playwright/test'; // Import Playwright test framework và hàm expect để kiểm tra kết quả
import accountsJson from '../test-data/qa/account.json'; // Import dữ liệu JSON chứa các tài khoản đăng nhập

// Định nghĩa kiểu cho một account
type Account = {
  username: string;        // Tên đăng nhập
  password: string;        // Mật khẩu
  expectSuccess: boolean;  // Dự đoán login có thành công không
};

// Định nghĩa kiểu cho JSON account list
type AccountList = {
  [key: string]: Account;  // Mỗi key (ví dụ: "user1") map tới 1 Account
};

const accounts = accountsJson as AccountList; // Ép kiểu JSON vào AccountList để TypeScript hiểu

// Lặp qua từng account trong JSON
for (const name in accounts) {
  const acc = accounts[name]; // Lấy object account tương ứng với key name

  // Tạo test cho từng account
  test(`Login Test – ${name}`, async ({ page }) => {
    await page.goto("https://www.saucedemo.com/"); // Mở trang login

    // Điền form login
    await page.fill("#user-name", acc.username); // Nhập username
    await page.fill("#password", acc.password);  // Nhập password
    await page.click("#login-button");           // Nhấn nút login

    if (acc.expectSuccess) {
      // Nếu dự đoán login thành công
      await expect(page.locator(".inventory_list")).toBeVisible(); // Kiểm tra page sản phẩm hiển thị
    } else {
      // Nếu dự đoán login thất bại
      await expect(page.locator('[data-test="error"]')).toBeVisible(); // Kiểm tra thông báo lỗi hiển thị
    }
  });
}
