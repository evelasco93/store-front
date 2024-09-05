import { ProductCardProps } from '../common/types'
import { Link } from '@tanstack/react-router'

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div
        className="product-card border rounded-lg shadow-lg p-4"
        id={product.id}
      >
        <div className="variants mt-4">
          <div className="images flex gap-2">
            <img
              key={product.variants[0].imageUrls[0]}
              src={product.variants[0].imageUrls[0]}
              alt={product.variants[0].imageUrls[0]}
              className="object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">{product.collectionName}</p>
      </div>
    </Link>
  )
}
