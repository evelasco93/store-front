import { type Locator, type Page } from '@playwright/test';

export class SearchPage {
  private readonly page: Page;
  private readonly searchInput: Locator

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('SEARCH FOR AN ITEM, COLOR, COLLECTION...')
  }

  async goto() {
    await this.page.goto('http://127.0.0.1:5173/search');
  }

  async sortBy(value: string){
    await this.page.getByRole('combobox').selectOption(value)
  }

  async filterCollection(value: string){
    await this.page.getByRole('complementary').getByText(value).click();
  }

  async search(value: string) {
    await this.searchInput.fill(value);
    await this.searchInput.press('Enter');
  }
}