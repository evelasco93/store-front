import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;
  private readonly nextPicture: Locator
  private readonly prevPicture: Locator
  private readonly addToBagButton: Locator
  private readonly shoppingBag: Locator
  private readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.prevPicture = page.getByRole('button', { name: '← Previous' })
    this.nextPicture = page.getByRole('button', { name: '→ Next' })
    this.addToBagButton = page.getByRole('button', { name: 'Add to Bag' })
    this.shoppingBag = page.getByRole('button', { name: '1' })
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
  }

  async goto(id:string) {
    await this.page.goto(`http://127.0.0.1:5173/product/${id}`);
  }

  async changePictures () {
    await this.nextPicture.click();
    await this.prevPicture.click();
  }

  async selectColor(color: string){
    await this.page.getByLabel(`Select ${color}`).click();
  }

  async selectSize(size: string){
    await this.page.getByLabel(`Select Size ${size.toUpperCase()}`).click();
  }

  async addToBag(size: string, color: string){
    this.selectColor(color)
    this.selectSize(size)
    await this.addToBagButton.click();
  }

  async checkOut(){
    await this.shoppingBag.click();
    await this.checkoutButton.click();
  }

}