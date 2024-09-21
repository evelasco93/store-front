import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/product';

test('product page should allow selecting a size, color and add to bag then proceed to checkout', async ({ page }) => {

  const productPage = new ProductPage(page)

  // navigating to product page
  await productPage.goto('3149d63b-0172-460a-af20-f06ebd6cc8a6');

  // assertions to ensure we're in the product page
  expect(page.url()).toBe('http://127.0.0.1:5173/product/3149d63b-0172-460a-af20-f06ebd6cc8a6')
  await expect(page.getByLabel('Select Black')).toBeVisible()
  await expect(page.getByLabel('Select Red')).toBeVisible()
  await expect(page.getByLabel('Select Gray Marl')).toBeVisible()
  await expect(page.getByLabel('Select size S')).toBeVisible();
  await expect(page.getByLabel('Select size M')).toBeVisible();
  await expect(page.getByLabel('Select size L')).toBeVisible();
  await expect(page.getByLabel('Select size XL')).toBeVisible();
  await expect(page.getByLabel('Quantity:')).toBeVisible();
  


  // Adding a product to the bag 
  await productPage.addToBag('Black','xl')
  await productPage.checkOut()

});