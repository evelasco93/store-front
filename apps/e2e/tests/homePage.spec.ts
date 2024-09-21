import { test } from '@playwright/test';
import { HomePage } from '../pages/home';

test('home page should allow navigation to search page', async ({ page }) => {

  const searchPage = new HomePage(page)
  await searchPage.goto();
  await page.getByRole('link').nth(1).click();
});