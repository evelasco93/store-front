import { createFileRoute, useParams } from '@tanstack/react-router'
import { ProductDetailPage } from '../../pages/ProductDetailPage'
import { useProduct } from '../../hooks/useProduct'
import { usePageTitle } from '../../hooks/usePageTitle'
import { ProductDTO } from '@store-front-typescript-bootcamp/schemas'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetail,
})

function ProductDetail() {
  useGSAP(() => {
    gsap.from('.product-info-page ', {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.in',
    })
  })
  const id = useParams({ from: '/product/$id' }).id
  const { data, isLoading, isError, error } = useProduct(id)
  usePageTitle(`${data?.name} - ${data?.collectionName}`)
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <main className="product-info-page">
      <ProductDetailPage product={data as ProductDTO} />
    </main>
  )
}
