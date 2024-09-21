import { expect, test } from '@playwright/test';
import { SearchPage } from '../pages/search';


test('Search and select product happy path', async ({ page }) => {

  const searchPage = new SearchPage(page)

  // navigating to search page
  await searchPage.goto();

  // sorting search page
  await searchPage.sortBy('name-desc');

  // filter page
  await searchPage.filterCollection('SHIRTS')

  // input search
  await searchPage.search('black')

  // selecting a product
  await page.getByRole('link', { name: 'https://static.zara.net/' }).click();

  // validating navigation and asserting that the product is displayed
  expect(page.url()).toBe('http://127.0.0.1:5173/product/3149d63b-0172-460a-af20-f06ebd6cc8a6')
  await expect(page.getByRole('heading', { name: 'BASIC HEAVYWEIGHT T-SHIRT' })).toBeVisible()

  // adding product to bag
  await page.getByLabel('Select Black').click();
  await page.getByLabel('Select size S').click();
  await page.getByRole('button', { name: 'Add to Bag' }).click();

  // opening shopping bag and heading to checkout

  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  // validating checkout screen
  expect(page.url()).toBe('http://127.0.0.1:5173/checkout')
  await expect(page.getByRole('img', { name: 'Checkout Placeholder' })).toBeVisible();
});