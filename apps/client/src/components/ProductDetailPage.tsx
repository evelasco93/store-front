import { useState } from 'react'
import { IProductCardProps } from '../common/types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const ProductDetailPage: React.FC<IProductCardProps> = ({ product }) => {
  const [selectedVariantColor, setSelectedVariantColor] = useState(
    product.variants[0].color,
  )

  const selectedVariant = product.variants.find(
    (variant) => variant.color === selectedVariantColor,
  )

  const carouselSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  }

  return (
    <main className="page-detail container flex flex-col gap-8 justify-center items-center min-h-screen p-8 text-center mx-auto">
      <div className="product-details flex flex-col md:flex-row gap-8">
        <div className="product-pictures">
          <div className="product-image-container">
            <Slider {...carouselSettings}>
              {selectedVariant?.imageUrls.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt={selectedVariant.color}
                  className="object-cover mb-2"
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="product-details text-left">
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="variants mt-4">
            <div className="color">
              {product.variants.map((variant) => (
                <button
                  key={variant.color}
                  className={`color-button w-12 h-12 rounded border ${
                    variant.color === selectedVariantColor
                      ? 'border-2 border-red-600'
                      : ''
                  }`}
                  style={{ backgroundColor: variant.colorCode }}
                  onClick={() => setSelectedVariantColor(variant.color)}
                  aria-label={`Select ${variant.color}`}
                ></button>
              ))}
            </div>
            <p className="text-gray-600 font-medium mb-2">
              {selectedVariant?.color}
            </p>
            <div className="sizes grid grid-cols-3 gap-2">
              {selectedVariant?.options.map((option) => (
                <button
                  key={option.size}
                  className="border border-gray-300 p-2 rounded hover:bg-gray-100 focus:outline-none"
                >
                  {option.size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
