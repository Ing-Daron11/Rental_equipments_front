import { test, expect } from '@playwright/test';

test('iniciar sesión', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});


test('filter equipment by category', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByTestId('equipos-button').click();
  await page.getByRole('combobox').filter({ hasText: 'Todas las categorías' }).click();
  await page.getByText('Laptops').click();
  await page.getByRole('combobox').filter({ hasText: 'Todos los estados' }).click();
  await page.getByLabel('Alquilado').getByText('Alquilado').click();
  await page.getByRole('combobox').filter({ hasText: 'Nombre' }).click();
  await page.getByLabel('Categoría').getByText('Categoría').click();
  await expect(page.getByRole('heading', { name: 'Equipos Disponibles' })).toBeVisible();
  await page.getByRole('heading', { name: 'Equipos Disponibles' }).click();
  await expect(page.getByRole('heading', { name: 'HP EliteBook X2' })).toBeVisible();
});

test('Consult rented equipment', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByTestId('equipos-rentados-button').click();
  await page.getByText('HP EliteBook X2').click();
  await expect(page.getByText('HP EliteBook X2')).toBeVisible();
});


test('Consult equipment maintenance', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('Tab');
  await page.getByRole('button', { name: 'Iniciar sesión' }).press('Enter');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByTestId('mantenimiento-button').click();
  await page.getByRole('heading', { name: 'Gestión de Mantenimientos' }).click();
  await expect(page.getByRole('heading', { name: 'Gestión de Mantenimientos' })).toBeVisible();
});

test('Full navigation', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('link', { name: 'Reservas' }).click();
  await page.getByRole('button', { name: 'Editar' }).first().click();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('link', { name: 'Reservas' }).click();
  await page.getByRole('link', { name: 'Mantenimiento' }).click();
  await page.getByRole('link', { name: 'AppNest' }).click();
  await page.getByRole('heading', { name: 'Administra tus equipos de' }).click();
  await expect(page.getByRole('heading', { name: 'Administra tus equipos de' })).toBeVisible();
});

