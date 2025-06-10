import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/https://rentalequipmentsfront-production.up.railway.app/');
  await expect(page).toHaveTitle(/./);
});