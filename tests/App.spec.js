const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} = require("../user");

test("Successful authorization", async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500,
        devtools: true
      });
      const page = await browser.newPage();
      await page.goto("https://netology.ru");
      await page.getByRole('link', { name: 'Войти' }).click();
      await page.getByPlaceholder('Email').fill(email);
      await page.getByPlaceholder('Пароль').fill(password);
      await page.getByTestId('login-submit-btn').click();
      await expect(page.getByRole('heading', { name: 'Моё обучение' })).toBeVisible;
      browser.close();
});

test("Failed authorization", async () => {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 500,
        devtools: true
      });
      const page = await browser.newPage();
      await page.goto("https://netology.ru");
      await page.getByRole('link', { name: 'Войти' }).click();
      await page.getByPlaceholder('Email').fill(incorrectEmail);
      await page.getByPlaceholder('Пароль').fill(incorrectPassword);
      await page.getByTestId('login-submit-btn').click();
      await expect(page.getByTestId('login-error-hint')).toBeVisible;
      browser.close();
});
