import { test, expect } from '@playwright/test';

test('CRUD for maintenance and check', async ({ page }) => {
  await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).click();
  await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Todos los estados' }).click();
  await page.getByLabel('Mantenimiento').getByText('Mantenimiento').click();
  await page.getByRole('heading', { name: 'No hay equipos registrados' }).click();
  await page.getByRole('link', { name: 'Mantenimiento' }).click();
  await page.getByRole('heading', { name: 'Gestión de Mantenimientos' }).click();
  await page.getByRole('link', { name: 'Agregar Mantenimiento' }).click();
  await page.getByRole('heading', { name: 'Crear Mantenimiento' }).click();
  await page.locator('form div').filter({ hasText: 'EquipoSeleccione un' }).getByRole('combobox').selectOption('fc22a717-3acc-4fd0-8880-1abecb749da7');
  await page.locator('div').filter({ hasText: /^TécnicoSeleccione un técnicoMalte2 \(malte10@gmail\.com\)$/ }).getByRole('combobox').selectOption('0beb02ff-61f0-4389-bbfa-ecf34feb1220');
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).click();
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).fill('T');
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).fill('Tecla dañada, reparaci');
  await page.getByRole('button', { name: 'Crear Mantenimiento' }).click();
  await page.getByRole('button', { name: 'Actualizar' }).click();
  await page.getByRole('button', { name: 'Editar' }).first().click();
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).click();
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).fill('Tecla dañada, reparación inmediata y c');
  await page.getByRole('textbox', { name: 'Descripción del mantenimiento' }).fill('Tecla dañada, reparación inmediata y cámara parpadea');
  await page.getByRole('button', { name: 'Guardar cambios' }).click();
  await page.getByRole('button', { name: 'Actualizar' }).click();

  await page.waitForTimeout(1000);

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Eliminar' }).first().click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('button', { name: 'Actualizar' }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Mantenimiento' }).click();
  await page.getByRole('button', { name: 'Actualizar' }).click();
  await page.getByRole('link', { name: 'Equipos' }).click();
  await page.getByRole('heading', { name: 'Gestión de Equipos' }).click();
});