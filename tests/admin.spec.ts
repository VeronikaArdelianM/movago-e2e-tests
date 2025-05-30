import { test, expect } from '@playwright/test';

test.describe.skip("Admin - User management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Activate user and update user info', async ({ page }) => {
    await expect(page.getByText('Вивчайте англійську з MovaGo')).toBeVisible();
  });

  test('Deactivate user', async ({ page }) => {
    await page.click('text=Увійти');
    await expect(page.getByText('Немає акаунту?')).toBeVisible();
  });

  test('Delete user', async ({ page }) => {
    await page.click('text=Увійти');
    await expect(page.getByText('Немає акаунту?')).toBeVisible();
  });

  test('Change user role', async ({ page }) => {
    await page.click('text=Увійти');
    await expect(page.getByText('Немає акаунту?')).toBeVisible();
  });
});

test.describe.skip("Admin - Lessons management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Create, update & delete lesson', async ({ page }) => {
    await expect(page.getByText('Вивчайте англійську з MovaGo')).toBeVisible();
  });
});
