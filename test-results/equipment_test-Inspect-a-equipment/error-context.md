# Test info

- Name: Inspect a equipment
- Location: C:\Users\daron\OneDrive\Escritorio\Semestre VII\Compunet3\App-equipment-rentals\Rental_equipments_front\tests_e2e\equipment_test.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.rounded-lg > div:nth-child(3) > button').first()

    at C:\Users\daron\OneDrive\Escritorio\Semestre VII\Compunet3\App-equipment-rentals\Rental_equipments_front\tests_e2e\equipment_test.spec.ts:12:73
```

# Page snapshot

```yaml
- main:
  - navigation:
    - link "AppNest":
      - /url: /
    - link "Dashboard":
      - /url: /dashboard
    - link "Equipos":
      - /url: /equipment
    - link "Reservas":
      - /url: /reservas
    - link "Mantenimiento":
      - /url: /maintenance
  - link "Volver al inicio":
    - /url: /
  - heading "Gestión de Equipos" [level=1]
  - paragraph: Administra y alquila equipos tecnológicos
  - button "Actualizar"
  - button "Agregar Equipo"
  - textbox "Buscar equipos..."
  - text: Filtros Categoría
  - combobox: Todas las categorías
  - text: Estado
  - combobox: Todos los estados
  - text: Ordenar por
  - combobox: Nombre
  - text: Orden
  - combobox: Ascendente
  - heading "Equipos Disponibles" [level=2]
  - paragraph: Mostrando 9 de 9 equipos
  - text: 4 disponibles 💻
  - paragraph: Sin imagen
  - text: Alquilado 💻 Laptop
  - heading "Aspire 3" [level=3]
  - paragraph: A31542g
  - paragraph: Ryzen 7
  - text: "Creado: 6/3/2025"
  - button "Ver detalles"
  - button "No disponible" [disabled]
  - text: 🖥️
  - paragraph: Sin imagen
  - text: Disponible 🖥️ Escritorio
  - heading "Computador Oficina" [level=3]
  - paragraph: Lenovo H15
  - paragraph: Intel 11 9900
  - text: "Creado: 6/3/2025"
  - button "Ver detalles"
  - button "Alquilar"
  - text: 💻
  - paragraph: Sin imagen
  - text: Alquilado 💻 Laptop
  - heading "HP EliteBook X2" [level=3]
  - paragraph: 840 G7
  - paragraph: Laptop ejecutiva
  - text: "Creado: 6/1/2025"
  - button "Ver detalles"
  - button "No disponible" [disabled]
  - text: 💻
  - paragraph: Sin imagen
  - text: Alquilado 💻 Laptop
  - heading "Laptop Dell XPS 25" [level=3]
  - paragraph: XPS9370
  - paragraph: Ultrabook de 13 pulgadas para tareas generales
  - text: "Creado: 6/1/2025"
  - button "Ver detalles"
  - button "No disponible" [disabled]
  - text: 💻
  - paragraph: Sin imagen
  - text: Disponible 💻 Laptop
  - heading "Lenovo idePad" [level=3]
  - paragraph: 16GBram
  - paragraph: Melo
  - text: "Creado: 6/9/2025"
  - button "Ver detalles"
  - button "Alquilar"
  - text: 💻
  - paragraph: Sin imagen
  - text: Alquilado 💻 Laptop
  - heading "Lenovo Legion" [level=3]
  - paragraph: Y5
  - paragraph: Laptop gaming
  - text: "Creado: 6/2/2025"
  - button "Ver detalles"
  - button "No disponible" [disabled]
  - text: 💻
  - paragraph: Sin imagen
  - text: Alquilado 💻 Laptop
  - heading "LENOVO LOQ" [level=3]
  - paragraph: AMD
  - paragraph: RTX 4050
  - text: "Creado: 6/2/2025"
  - button "Ver detalles"
  - button "No disponible" [disabled]
  - text: 💻
  - paragraph: Sin imagen
  - text: Disponible 💻 Laptop
  - heading "MAC" [level=3]
  - paragraph: m4
  - paragraph: G_1233334
  - text: "Creado: 6/5/2025"
  - button "Ver detalles"
  - button "Alquilar"
  - text: 🖥️
  - paragraph: Sin imagen
  - text: Disponible 🖥️ Escritorio
  - heading "pc de mesa prueba" [level=3]
  - paragraph: 32GB
  - paragraph: Intel 5i
  - text: "Creado: 6/9/2025"
  - button "Ver detalles"
  - button "Alquilar"
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Inspect a equipment', async ({ page }) => {
   4 |   await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
   5 |   await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
   6 |   await page.getByRole('textbox', { name: 'Correo' }).click();
   7 |   await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
   8 |   await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
   9 |   await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  10 |   await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  11 |   await page.getByRole('link', { name: 'Equipos' }).click();
> 12 |   await page.locator('.rounded-lg > div:nth-child(3) > button').first().click();
     |                                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  13 |   await page.locator('div').filter({ hasText: /^DescripciónRyzen 7$/ }).getByRole('paragraph').click();
  14 |   await page.locator('body').press('Escape');
  15 |   await page.locator('div').filter({ hasText: 'Detalles del Equipo💻Sin' }).nth(1).click();
  16 |   await page.getByRole('button', { name: 'Cerrar' }).click();
  17 |   await page.getByRole('heading', { name: 'Equipos Disponibles' }).click();
  18 |   await expect(page.getByRole('heading', { name: 'Equipos Disponibles' })).toBeVisible();
  19 | });
  20 |
  21 | test('Edit an equipment', async ({ page }) => {
  22 |   await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  23 |   await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  24 |   await page.getByRole('textbox', { name: 'Correo' }).click();
  25 |   await page.getByRole('textbox', { name: 'Correo' }).press('CapsLock');
  26 |   await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  27 |   await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  28 |   await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  29 |   await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  30 |   await page.getByRole('link', { name: 'Equipos' }).click();
  31 |   await page.locator('.rounded-lg > div:nth-child(3) > button').first().click();
  32 |   await page.getByRole('button', { name: 'Editar' }).click();
  33 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro 16' }).click();
  34 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro 16' }).fill('Aspire 3 prueba');
  35 |   await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
  36 |   await page.locator('html').click();
  37 |   await page.getByRole('button', { name: 'Guardar Cambios' }).click();
  38 |   await page.getByRole('button', { name: 'Actualizar' }).click();
  39 |   await page.locator('.rounded-lg > div:nth-child(3) > button').first().click();
  40 |   await page.getByRole('button', { name: 'Cerrar' }).click();
  41 |   await page.getByRole('heading', { name: 'Equipos Disponibles' }).click();
  42 |   await expect(page.getByRole('heading', { name: 'Equipos Disponibles' })).toBeVisible();
  43 | });
  44 |
  45 |
  46 |
  47 | test('create and delete an equipment', async ({ page }) => {
  48 |   await page.goto('https://rentalequipmentsfront-production.up.railway.app/');
  49 |   await page.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' }).click();
  50 |   await page.getByRole('textbox', { name: 'Correo' }).click();
  51 |   await page.getByRole('textbox', { name: 'Correo' }).fill('daron@gmail.com');
  52 |   await page.getByRole('textbox', { name: 'Correo' }).press('Tab');
  53 |   await page.getByRole('textbox', { name: 'Contraseña' }).fill('daron123');
  54 |   await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  55 |   await page.getByRole('link', { name: 'Equipos' }).click();
  56 |   await page.getByRole('button', { name: 'Agregar Equipo' }).click();
  57 |   await page.getByRole('button', { name: 'Agregar Equipo' }).press('Escape');
  58 |   await page.getByRole('button').filter({ hasText: /^$/ }).click();
  59 |   await page.getByRole('button', { name: 'Agregar Equipo' }).click();
  60 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro 16' }).click();
  61 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro 16' }).fill('pc de mesa prueba');
  62 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro M3 Max' }).click();
  63 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro M3 Max' }).fill('32');
  64 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro M3 Max' }).press('CapsLock');
  65 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro M3 Max' }).fill('32GB');
  66 |   await page.getByRole('textbox', { name: 'Ej: MacBook Pro M3 Max' }).press('CapsLock');
  67 |   await page.getByRole('textbox', { name: 'Describe las características' }).click();
  68 |   await page.getByRole('textbox', { name: 'Describe las características' }).press('CapsLock');
  69 |   await page.getByRole('textbox', { name: 'Describe las características' }).fill('R');
  70 |   await page.getByRole('textbox', { name: 'Describe las características' }).press('CapsLock');
  71 |   await page.getByRole('textbox', { name: 'Describe las características' }).fill('');
  72 |   await page.getByRole('textbox', { name: 'Describe las características' }).press('CapsLock');
  73 |   await page.getByRole('textbox', { name: 'Describe las características' }).fill('I');
  74 |   await page.getByRole('textbox', { name: 'Describe las características' }).press('CapsLock');
  75 |   await page.getByRole('textbox', { name: 'Describe las características' }).fill('Intel 5i');
  76 |   await page.getByRole('combobox').filter({ hasText: 'Seleccionar categoría' }).click();
  77 |   await page.getByLabel('🖥️ Computador de escritorio').getByText('🖥️ Computador de escritorio').click();
  78 |   await page.getByRole('button', { name: 'Crear Equipo' }).click();
  79 |   await page.locator('div:nth-child(9) > div:nth-child(3) > button').first().click();
  80 |   page.once('dialog', dialog => {
  81 |     console.log(`Dialog message: ${dialog.message()}`);
  82 |     dialog.dismiss().catch(() => {});
  83 |   });
  84 |   await page.getByRole('button', { name: 'Eliminar' }).click();
  85 | });
  86 |
```