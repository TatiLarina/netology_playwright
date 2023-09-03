const { test, expect } = require("@playwright/test");

const {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} = require("../user");

test("Successful authorization", async ({ page }) => {

      await page.goto("https://netology.ru/?modal=sign_in");
      await page.getByPlaceholder('Email').fill(email);
      await page.getByPlaceholder('Пароль').fill(password);
      await page.getByTestId('login-submit-btn').click();
      await expect(page.getByTestId('profile-programs-content')).toBeVisible;
      
});

test("Failed authorization", async ({ page }) => {

      await page.goto("https://netology.ru/?modal=sign_in");
      await page.getByPlaceholder('Email').fill(incorrectEmail);
      await page.getByPlaceholder('Пароль').fill(incorrectPassword);
      await page.getByTestId('login-submit-btn').click();
      await expect(page.getByTestId('login-error-hint')).toBeVisible;

});
