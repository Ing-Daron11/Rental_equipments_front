import { test, expect } from '@playwright/test';

test('Rented equipment, check details, edit and delete', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Todos los estados' }).click();
  await page.getByLabel('Disponible').getByText('Disponible').click();
  await page.getByRole('button', { name: 'Ver detalles' }).nth(3).click();
  await page.getByRole('button', { name: 'Cerrar' }).click();
  await page.getByRole('button', { name: 'Alquilar' }).nth(3).click();

  await page.waitForTimeout(2000);

  await page.getByRole('link', { name: 'Reservas' }).click();
  await page.getByText('pc de mesa prueba').click();
  await page.getByRole('button', { name: 'Editar' }).nth(3).click();
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').press('ArrowUp');
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByText('pc de mesa prueba').click();
  await page.getByRole('button', { name: 'Eliminar' }).nth(3).click();
  await page.getByRole('button', { name: 'Sí, eliminar' }).click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Todos los estados' }).click();
  await page.getByLabel('Disponible').getByText('Disponible').click();
  await page.getByRole('heading', { name: 'pc de mesa prueba' }).click();
});



