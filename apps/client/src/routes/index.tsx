import { createFileRoute } from '@tanstack/react-router'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { ProductCard } from '../components/ProductCard'

export const Route = createFileRoute('/')({
  component: StoreFront,
})

function StoreFront() {
  usePageTitle('Laserants Clothing Store')

  const { data, isLoading, isError, error } = useProducts()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <main className="container flex flex-col gap-8 justify-center items-center min-h-screen p-8 text-center mx-auto">
      <h1 className="text-5xl md:text-7xl font-bold text-balance max-w-screen-lg">
        Welcome to my store!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
