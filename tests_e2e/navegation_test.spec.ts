import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('link', { name: 'Ver Equipos Disponibles' }).click();
  await page.getByRole('heading', { name: 'Gestión de Equipos' }).click();
  await expect(page.getByRole('heading', { name: 'Gestión de Equipos' })).toBeVisible();
});