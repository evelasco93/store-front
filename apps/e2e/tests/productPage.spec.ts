import { test } from '@playwright/test';
import { ProductPage } from '../pages/product';

test('product page should allow selecting a size, color and add to bag then proceed to checkout', async ({ page }) => {

  const productPage = new ProductPage(page)
  // navigating to search page
  await productPage.goto('3149d63b-0172-460a-af20-f06ebd6cc8a6');

  // Adding a product to the bag 
  await productPage.addToBag('xl','Black')
  await productPage.checkOut()

});