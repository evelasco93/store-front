import { type Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://127.0.0.1:5173');
  }

}