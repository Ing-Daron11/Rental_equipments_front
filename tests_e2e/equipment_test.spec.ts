import { test, expect } from "@playwright/test";

test("Inspect a equipment", async ({ page }) => {
  await page.goto("https://rentalequipmentsfront-production.up.railway.app/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Iniciar Sesión" })
    .click();
  await page.getByRole("textbox", { name: "Correo" }).click();
  await page.getByRole("textbox", { name: "Correo" }).fill("daron@gmail.com");
  await page.getByRole("textbox", { name: "Correo" }).press("Tab");
  await page.getByRole("textbox", { name: "Contraseña" }).fill("daron123");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await page.getByRole("link", { name: "Equipos" }).click();
  await page.waitForSelector('[data-testid^="view-details-"]');
  await page
    .getByTestId(/^view-details-/)
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^DescripciónRyzen 7$/ })
    .getByRole("paragraph")
    .click();
  await page.locator("body").press("Escape");
  await page
    .locator("div")
    .filter({ hasText: "Detalles del Equipo💻Sin" })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Cerrar" }).click();
  await page.getByRole("heading", { name: "Equipos Disponibles" }).click();
  await expect(
    page.getByRole("heading", { name: "Equipos Disponibles" })
  ).toBeVisible();
});

test("Edit an equipment", async ({ page }) => {
  await page.goto("https://rentalequipmentsfront-production.up.railway.app/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Iniciar Sesión" })
    .click();
  await page.getByRole("textbox", { name: "Correo" }).click();
  await page.getByRole("textbox", { name: "Correo" }).press("CapsLock");
  await page.getByRole("textbox", { name: "Correo" }).fill("daron@gmail.com");
  await page.getByRole("textbox", { name: "Correo" }).press("Tab");
  await page.getByRole("textbox", { name: "Contraseña" }).fill("daron123");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await page.getByRole("link", { name: "Equipos" }).click();
  await page.waitForSelector('[data-testid^="view-details-"]');
  await page
    .getByTestId(/^view-details-/)
    .first()
    .click();
  await page.getByRole("button", { name: "Editar" }).click();
  await page.getByRole("textbox", { name: "Ej: MacBook Pro 16" }).click();
  await page
    .getByRole("textbox", { name: "Ej: MacBook Pro 16" })
    .fill("Aspire 3 prueba");
  await page.getByRole("combobox").filter({ hasText: /^$/ }).click();
  await page.locator("html").click();
  await page.getByRole("button", { name: "Guardar Cambios" }).click();
  await page.getByRole("button", { name: "Actualizar" }).click();
  await page.locator(".rounded-lg > div:nth-child(3) > button").first().click();
  await page.getByRole("button", { name: "Cerrar" }).click();
  await page.getByRole("heading", { name: "Equipos Disponibles" }).click();
  await expect(
    page.getByRole("heading", { name: "Equipos Disponibles" })
  ).toBeVisible();
});

test("create and delete an equipment", async ({ page }) => {
  await page.goto("https://rentalequipmentsfront-production.up.railway.app/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Iniciar Sesión" })
    .click();
  await page.getByRole("textbox", { name: "Correo" }).click();
  await page.getByRole("textbox", { name: "Correo" }).fill("daron@gmail.com");
  await page.getByRole("textbox", { name: "Correo" }).press("Tab");
  await page.getByRole("textbox", { name: "Contraseña" }).fill("daron123");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await page.getByRole("link", { name: "Equipos" }).click();
  await page.getByRole("button", { name: "Agregar Equipo" }).click();
  await page.getByRole("button", { name: "Agregar Equipo" }).press("Escape");
  await page.getByRole("button").filter({ hasText: /^$/ }).click();
  await page.getByRole("button", { name: "Agregar Equipo" }).click();
  await page.getByRole("textbox", { name: "Ej: MacBook Pro 16" }).click();
  await page
    .getByRole("textbox", { name: "Ej: MacBook Pro 16" })
    .fill("pc de mesa prueba");
  await page.getByRole("textbox", { name: "Ej: MacBook Pro M3 Max" }).click();
  await page
    .getByRole("textbox", { name: "Ej: MacBook Pro M3 Max" })
    .fill("32");
  await page
    .getByRole("textbox", { name: "Ej: MacBook Pro M3 Max" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Ej: MacBook Pro M3 Max" })
    .fill("32GB");
  await page
    .getByRole("textbox", { name: "Ej: MacBook Pro M3 Max" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .click();
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .fill("R");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .fill("");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .fill("I");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .press("CapsLock");
  await page
    .getByRole("textbox", { name: "Describe las características" })
    .fill("Intel 5i");
  await page
    .getByRole("combobox")
    .filter({ hasText: "Seleccionar categoría" })
    .click();
  await page
    .getByLabel("🖥️ Computador de escritorio")
    .getByText("🖥️ Computador de escritorio")
    .click();
  await page.getByRole("button", { name: "Crear Equipo" }).click();
  await page
    .locator("div:nth-child(9) > div:nth-child(3) > button")
    .first()
    .click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Eliminar" }).click();
});
