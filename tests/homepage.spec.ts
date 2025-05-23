import { test, expect, request } from '@playwright/test';
import { seedAdminUser } from "../utils/seedAdminUser";
import { seedLessons } from "../utils/seedLessons";

test.describe("Homepage", () => {
  test.beforeAll(async ({ browser }) => {
    await seedAdminUser();
    await seedLessons();

  });
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads', async ({ page }) => {
    await expect(page.getByText('Вивчайте англійську з MovaGo')).toBeVisible();
  });

  test('login', async ({ page }) => {
    await page.click('text=Увійти');
    await expect(page.getByText('Немає акаунту?')).toBeVisible();
  });
});
