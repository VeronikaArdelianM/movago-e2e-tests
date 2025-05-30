import { test, expect } from '@playwright/test';

test.describe.skip("Lessons", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Filtering', async ({ page }) => {
    await expect(page.getByText('Вивчайте англійську з MovaGo')).toBeVisible();
  });

  test('New lesson progress tracking', async ({ page }) => {
    await page.click('text=Увійти');
    await expect(page.getByText('Немає акаунту?')).toBeVisible();
  });

  test('Repeat lesson tracking', async ({ page }) => {
    await page.click('text=Увійти');
    await expect(page.getByText('Немає акаунту?')).toBeVisible();
  });
});
