import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

// Utilizamos beforeEach para que todas las pruebas arranquen desde el sandbox autorizado
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

// 1. Happy Path: Flujo E2E completo
test('Happy Path - Login, búsqueda, compra y logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login(process.env.SAUCE_USER!, process.env.SAUCE_PASS!);

  await inventoryPage.sortByPriceLowToHigh();
  await inventoryPage.addProductToCart('sauce-labs-onesie');
  await inventoryPage.openCart();
  await inventoryPage.checkout();

  await inventoryPage.fillCustomerInfo('Prueba', 'QA', '11001');
  await inventoryPage.continueCheckout();
  await inventoryPage.finishOrder();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

  await inventoryPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// 2. Caso Negativo 1
test('Caso Negativo 1 - Intento de login con usuario inexistente', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('usuario_falso', process.env.SAUCE_PASS!);

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
});

// 3. Caso Negativo 2
test('Caso Negativo 2 - Fallo de checkout por campos obligatorios vacíos', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login(process.env.SAUCE_USER!, process.env.SAUCE_PASS!);

  await inventoryPage.addProductToCart('sauce-labs-backpack');
  await inventoryPage.openCart();
  await inventoryPage.checkout();
  await inventoryPage.continueCheckout();

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

// 4. Validación de datos
test('Validación de datos - El precio tiene el formato de moneda correcto', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login(process.env.SAUCE_USER!, process.env.SAUCE_PASS!);

  const textoPrecio = await inventoryPage.getFirstProductPriceText();
  expect(textoPrecio).toMatch(/^\$\d+\.\d{2}$/);
});

// 5. Validación de mensajes
test('Validación de mensajes - Mensaje exacto para usuario bloqueado', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(process.env.SAUCE_LOCKED_USER!, process.env.SAUCE_PASS!);

  const mensajeError = page.locator('[data-test="error"]');
  await expect(mensajeError).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});