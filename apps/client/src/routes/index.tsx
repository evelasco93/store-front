import { createFileRoute } from '@tanstack/react-router'
import { useProducts } from '../hooks/useProducts'
import { useCollections } from '../hooks/useCollections'
import { ProductCard } from '../components/ProductCard'
import { CollectionItem } from '../components/CollectionsList'
import { usePageTitle } from '../hooks/usePageTitle'

export const Route = createFileRoute('/')({
  component: StoreFront,
})

function StoreFront() {
  usePageTitle('Clothing Store')

  const {
    data: productData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productError,
  } = useProducts()
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
      <h1 className="text-5xl md:text-7xl font-bold text-balance max-w-screen-lg">
        Welcome to my store!
      </h1>
      <div className="collections-list">
        <h2 className="text-3xl font-semibold mb-4">Collections</h2>
        <div className="collections-list grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionData?.collections.map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
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
