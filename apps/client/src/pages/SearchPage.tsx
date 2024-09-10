import React from 'react'
import { useProducts } from '../hooks/useProducts'
import { useCollections } from '../hooks/useCollections'
import { ProductCard } from '../components/ProductCard'
import {
  CollectionItem,
  AllCollectionItem,
} from '../components/CollectionsList'
import { usePageTitle } from '../hooks/usePageTitle'
import { SearchBar } from '../components/SearchBar'
import { useState } from 'react'
import { SortOptions } from '../components/SortOptions'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const SearchPage: React.FC = () => {
  usePageTitle('Search')

  useGSAP(() => {
    gsap.from('.search-bar-container', {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
    })

    gsap.from('.sort-filter-options', {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: 'power1.in',
    })

    gsap.from('.products-grid', {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: 'power3.in',
    })
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  )
  const [sortBy, setSortBy] = useState<string>('name-asc') // Default sorting from A-Z

  const {
    data: productData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productError,
  } = useProducts(searchQuery, selectedCollection, sortBy)

  const {
    data: collectionData,
    isLoading: isCollectionsLoading,
    isError: isCollectionsError,
    error: collectionError,
  } = useCollections()

  if (isProductsLoading || isCollectionsLoading) return <div>Loading...</div>
  if (isProductsError || isCollectionsError) {
    console.error(productError?.message || collectionError?.message)
    return <div>Error loading data.</div>
  }

  return (
    <main className="container flex flex-col gap-8 min-h-screen p-8 mx-auto">
      <div className="search-bar-container container mx-auto p-4">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      </div>
      <div className="flex gap-8 w-full">
        <aside className="sort-filter-options w-1/4 p-4">
          <div className="sort-options mb-8">
            <label htmlFor="sort" className="block text-lg font-semibold mb-2">
              Sort
            </label>
            <SortOptions
              sortBy={sortBy}
              onSortChange={(e) => setSortBy(e.target.value)}
            />
          </div>
          <div className="collections-list-container">
            <h3 className="text-2xl font-semibold mb-4">Collections</h3>
            <div className="collections-list grid gap-4">
              <AllCollectionItem
                onClick={() => setSelectedCollection(null)}
                selectedCollection={selectedCollection === null}
              />
              {collectionData?.collections.map((collection) => (
                <CollectionItem
                  key={collection.id}
                  collection={collection}
                  onClick={setSelectedCollection}
                  selected={selectedCollection === collection.id}
                />
              ))}
            </div>
          </div>
        </aside>
        <div className="grid products-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-3/4">
          {productData?.products.length ? (
            productData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </main>
  )
}
