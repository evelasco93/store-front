import React from 'react'
import { useCart } from '../context/CartContext'
import { FiShoppingBag } from 'react-icons/fi'

export const CartIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { cartItems } = useCart()

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <button
      onClick={onClick}
      className="hover:text-blue-600 [&.active]:text-blue-600"
    >
      <FiShoppingBag size={24} />
      {getTotalQuantity() > 0 && (
        <span className="absolute top-3 right-0 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center mr-2">
          {getTotalQuantity()}
        </span>
      )}
    </button>
  )
}
