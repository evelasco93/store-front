import React from 'react'
import { IAddToCartButtonProps, ICartItem } from '../common/types'
import { useCart } from '../context/CartContext'

export const AddToCartButton: React.FC<IAddToCartButtonProps> = ({
  productId,
  name,
  color,
  size,
  price,
  imageUrl,
  quantity,
  disabled,
}) => {
  const { addToCart } = useCart()

  const handleClick = () => {
    if (size) {
      const item: ICartItem = {
        productId,
        name,
        color,
        size,
        price,
        imageUrl,
        quantity,
      }
      addToCart(item)
    }
  }

  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      onClick={handleClick}
      disabled={disabled}
    >
      Add to Bag
    </button>
  )
}
