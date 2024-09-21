import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';

test('home page should have heading and allow navigation to search page', async ({ page }) => {

  const searchPage = new HomePage(page)
  await searchPage.goto();
  await expect(page.getByRole('heading', { name: 'WELCOME TO MY CLOTHING STORE' })).toBeVisible();
  await page.getByRole('link').nth(1).click();
});