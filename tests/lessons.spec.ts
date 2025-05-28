import { test, expect } from '@playwright/test';
import { seedAdminUser } from "../utils/seedAdminUser";
import { seedLessons } from "../utils/seedLessons";

test.describe.skip("Lessons", () => {
  test.beforeAll(async ({ }) => {
    await seedLessons();
    await seedAdminUser();

  });
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
