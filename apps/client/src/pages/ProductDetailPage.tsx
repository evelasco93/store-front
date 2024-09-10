import React, { useState } from 'react'
import { IProductCardProps } from '../common/types'
import { AddToCartButton } from '../components/AddToCartButton'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']

export const ProductDetailPage: React.FC<IProductCardProps> = ({ product }) => {
  const [selectedVariantColor, setSelectedVariantColor] = useState(
    product.variants[0].color,
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const selectedVariant = product.variants.find(
    (variant) => variant.color === selectedVariantColor,
  )

  const carouselSettings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  }

  const availableColors = product.variants.filter((variant) =>
    variant.options.some((option) => option.stock > 0),
  )

  const sortedOptions = (options: { size: string; stock: number }[]) =>
    options.sort(
      (a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size),
    )

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
              {availableColors.map((variant) => (
                <button
                  key={variant.color}
                  className={`color-button w-12 h-12 rounded border ${
                    variant.color === selectedVariantColor
                      ? 'border-2 border-blue-600'
                      : 'border-gray-300'
                  } ${!variant.options.some((option) => option.stock > 0) ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: variant.colorCode }}
                  onClick={() => {
                    if (variant.options.some((option) => option.stock > 0)) {
                      setSelectedVariantColor(variant.color)
                      setSelectedSize(null)
                      setQuantity(1)
                    }
                  }}
                  aria-label={`Select ${variant.color}`}
                  disabled={!variant.options.some((option) => option.stock > 0)}
                ></button>
              ))}
            </div>
            <p className="text-gray-600 font-medium mb-2">
              {selectedVariant?.color}
            </p>
            <div className="sizes grid grid-cols-3 gap-2">
              {selectedVariant?.options &&
                sortedOptions(selectedVariant.options).map((option) => (
                  <button
                    key={option.size}
                    className={`border border-gray-300 p-2 rounded ${
                      option.stock === 0
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'hover:border-blue-600 focus:outline-none'
                    } ${option.size === selectedSize ? 'border-2 border-blue-600' : ''}`}
                    onClick={() => {
                      if (option.stock > 0) {
                        setSelectedSize(option.size)
                      }
                    }}
                    aria-label={`Select size ${option.size}`}
                    disabled={option.stock === 0}
                  >
                    {option.size}
                  </button>
                ))}
            </div>
            <div className="quantity mt-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                max={
                  selectedVariant?.options.find(
                    (opt) => opt.size === selectedSize,
                  )?.stock || 1
                }
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 p-2 rounded w-10"
              />
            </div>
          </div>
          <AddToCartButton
            productId={product.id}
            name={product.name}
            color={selectedVariantColor}
            size={selectedSize || ''}
            price={product.price}
            imageUrl={selectedVariant?.imageUrls[0] || ''}
            quantity={quantity}
            disabled={!selectedSize || quantity <= 0}
          />
        </div>
      </div>
    </main>
  )
}
