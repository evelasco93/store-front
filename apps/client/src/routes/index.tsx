import { createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/')({
  component: StoreFront,
})

function StoreFront() {
  usePageTitle('Clothing Store')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  )

  const {
    data: productData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productError,
  } = useProducts(searchQuery, selectedCollection)

  const {
    data: collectionData,
    isLoading: isCollectionsLoading,
    isError: isCollectionsError,
    error: collectionError,
  } = useCollections()

  if (isProductsLoading || isCollectionsLoading) return <div>Loading...</div>
  if (isProductsError || isCollectionsError)
    return <div>Error: {productError?.message || collectionError?.message}</div>

  return (
    <main className="container flex flex-col gap-8 justify-center items-center min-h-screen p-8 text-center mx-auto">
      <div className="container mx-auto p-4">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className="collections-list">
        <h2 className="text-3xl font-semibold mb-4">Collections</h2>
        <div className="collections-list grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AllCollectionItem onClick={() => setSelectedCollection(null)} />
          {collectionData?.collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              onClick={setSelectedCollection}
            />
          ))}
        </div>
      </div>
      <div className="grid products-list grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
