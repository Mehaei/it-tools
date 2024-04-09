import { test, expect } from '@playwright/test';

test.describe('Tool - Curl to code', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/curl-to-code');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Curl to code - IT Tools');
  });

  test('', async ({ page }) => {

  });
});