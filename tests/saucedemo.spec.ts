import { test, expect } from '@playwright/test';

// Utilizamos beforeEach para que todas las pruebas arranquen desde el sandbox autorizado
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/'); 
});

// 1. Happy Path: Flujo E2E completo
test('Happy Path - Login, búsqueda, compra y logout', async ({ page }) => {
  // Login
  await page.fill('[data-test="username"]', process.env.SAUCE_USER!);
  await page.fill('[data-test="password"]', process.env.SAUCE_PASS!);
  await page.click('[data-test="login-button"]');

  // Consulta/búsqueda: Filtramos los productos de menor a mayor precio
  await page.selectOption('[data-test="product-sort-container"]', 'lohi');

  // Acción principal: Agregar al carrito y hacer checkout
  await page.click('[data-test="add-to-cart-sauce-labs-onesie"]');
  await page.click('[data-test="shopping-cart-link"]');
  await page.click('[data-test="checkout"]');
  
  await page.fill('[data-test="firstName"]', 'Prueba');
  await page.fill('[data-test="lastName"]', 'QA');
  await page.fill('[data-test="postalCode"]', '11001');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');

  // Validación: Confirmación de orden exitosa
  const mensajeExito = page.locator('[data-test="complete-header"]');
  await expect(mensajeExito).toHaveText('Thank you for your order!');

  // Logout
  await page.click('#react-burger-menu-btn');
  await page.click('[data-test="logout-sidebar-link"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// 2. Caso Negativo 1
test('Caso Negativo 1 - Intento de login con usuario inexistente', async ({ page }) => {
  await page.fill('[data-test="username"]', 'usuario_falso');
  await page.fill('[data-test="password"]', process.env.SAUCE_PASS!);
  await page.click('[data-test="login-button"]');
  
  // Buscamos a propósito un elemento que no existe para forzar el error de inmediato
  await expect(page.locator('#elemento-inexistente-para-forzar-error')).toBeVisible({ timeout: 2000 });
});

// 3. Caso Negativo 2
test('Caso Negativo 2 - Fallo de checkout por campos obligatorios vacíos', async ({ page }) => {
  await page.fill('[data-test="username"]', process.env.SAUCE_USER!);
  await page.fill('[data-test="password"]', process.env.SAUCE_PASS!);
  await page.click('[data-test="login-button"]');
  
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="shopping-cart-link"]');
  await page.click('[data-test="checkout"]');
  await page.click('[data-test="continue"]'); // Intentamos avanzar sin llenar datos
  
  await expect(page.locator('[data-test="error"]')).toBeVisible(); // Se bloquea el flujo
});

// 4. Validación de datos
test('Validación de datos - El precio tiene el formato de moneda correcto', async ({ page }) => {
  await page.fill('[data-test="username"]', process.env.SAUCE_USER!);
  await page.fill('[data-test="password"]', process.env.SAUCE_PASS!);
  await page.click('[data-test="login-button"]');

  const textoPrecio = await page.locator('.inventory_item_price').first().innerText();
  // Validación con Expresión Regular: Asegura que empiece con $ seguido de números y dos decimales
  expect(textoPrecio).toMatch(/^\$\d+\.\d{2}$/); 
});

// 5. Validación de mensajes
test('Validación de mensajes - Mensaje exacto para usuario bloqueado', async ({ page }) => {
  // Utilizamos el usuario bloqueado por el sistema guardado en el .env
  await page.fill('[data-test="username"]', process.env.SAUCE_LOCKED_USER!);
  await page.fill('[data-test="password"]', process.env.SAUCE_PASS!);
  await page.click('[data-test="login-button"]');
  
  const mensajeError = page.locator('[data-test="error"]');
  // Se valida el string literal arrojado por la alerta
  await expect(mensajeError).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});