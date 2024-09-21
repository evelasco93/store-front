import { test } from '@playwright/test';
import { SearchPage } from '../pages/search';

test('search page should have filters, sorting and search bar functionality', async ({ page }) => {

  const searchPage = new SearchPage(page)
  // navigating to search page
  await searchPage.goto();

  // sorting search page
  await searchPage.sortBy('name-desc');
  await searchPage.sortBy('name-asc');

  // filter page
  await searchPage.filterCollection('JEANS')
  await searchPage.filterCollection('HOODIES')
  await searchPage.filterCollection('SHIRTS')
  await searchPage.filterCollection('ALL')

  // input search
  await searchPage.search('jeans')
  await searchPage.search('shirts')
  await searchPage.search('hoodies')
  await searchPage.search('black')
});