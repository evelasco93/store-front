import { createFileRoute, useParams } from '@tanstack/react-router'
import { ProductDetailPage } from '../../components/ProductDetailPage'
import { useProduct } from '../../hooks/useProduct'
import { Product } from '../../common/types'
import { usePageTitle } from '../../hooks/usePageTitle'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetail,
})

function ProductDetail() {
  const id = useParams({ from: '/product/$id' }).id
  const { data, isLoading, isError, error } = useProduct(id)
  usePageTitle(`${data?.name} - ${data?.collectionName}`)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return <ProductDetailPage product={data as Product} />
}
