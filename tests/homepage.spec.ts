import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://frontend:4200');
  await expect(page.getByText('Вивчайте англійську з MovaGo')).toBeVisible();
});

test('login', async ({ page }) => {
  await page.goto('http://frontend:4200');
  await page.click('text=Увійти');
  await expect(page.getByText('Немає акаунту?')).toBeVisible();
});
