import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly sortDropdown = '[data-test="product-sort-container"]';
  readonly cartLink = '[data-test="shopping-cart-link"]';
  readonly checkoutButton = '[data-test="checkout"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';
  readonly completeHeader = '[data-test="complete-header"]';
  readonly menuButton = '#react-burger-menu-btn';
  readonly logoutLink = '[data-test="logout-sidebar-link"]';
  readonly inventoryPrice = '.inventory_item_price';

  constructor(page: Page) {
    this.page = page;
  }

  async sortByPriceLowToHigh() {
    await this.page.selectOption(this.sortDropdown, 'lohi');
  }

  async addProductToCart(productId: string) {
    await this.page.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async continueCheckout() {
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async getSuccessMessage() {
    return await this.page.locator(this.completeHeader).innerText();
  }

  async logout() {
    await this.page.click(this.menuButton);
    await this.page.click(this.logoutLink);
  }

  async getFirstProductPriceText() {
    return await this.page.locator(this.inventoryPrice).first().innerText();
  }
}
