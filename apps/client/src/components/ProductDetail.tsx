import { ProductCardProps } from '../common/types'

export const ProductDetailCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-600">
        Collection: {product.collectionName}
      </p>

      <div className="variants mt-4">
        {product.variants.map((variant) => (
          <div key={variant.id} className="variant">
            <p className="text-gray-600">{variant.color}</p>
            <div className="images flex gap-2">
              {variant.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              ))}
            </div>
            <div className="sizes mt-2">
              {variant.options.map((option) => (
                <div key={option.size}>
                  <p>{option.size}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
