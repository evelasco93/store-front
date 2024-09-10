import React, { ChangeEvent } from 'react'
import { useCart } from '../context/CartContext'
import { FiTrash2, FiXCircle } from 'react-icons/fi'
import { CheckoutButton } from './CheckOutButton'

export const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const getSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  const handleQuantityChange = (
    productId: string,
    color: string,
    size: string,
    newQuantity: number,
  ) => {
    if (newQuantity > 0) {
      updateQuantity(productId, color, size, newQuantity)
    }
  }

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300 shadow-lg z-50 transform translate-x-0 transition-transform duration-300 ease-in-out">
      <div className="relative h-full flex flex-col">
        <button
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FiXCircle size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4 p-4 mt-5">Shopping Bag</h2>
        {cartItems.length > 0 ? (
          <ul className="flex-1 overflow-y-auto">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="border-b py-4 px-4 flex items-start justify-between"
              >
                <img
                  className="w-20 h-20 object-cover"
                  src={item.imageUrl}
                  alt={item.color}
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <div className="text-sm mb-1">
                    <span className="font-bold">Size:</span> {item.size}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-bold">Color:</span> {item.color}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-bold">Price:</span> ${item.price}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(
                          item.productId,
                          item.color,
                          item.size,
                          Number(e.target.value),
                        )
                      }
                      className="ml-2 border border-gray-300 p-1 rounded w-16"
                    />
                  </div>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 ml-4"
                  onClick={() =>
                    removeFromCart(item.productId, item.color, item.size)
                  }
                >
                  <FiTrash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4">Your cart is empty.</p>
        )}
        <div className="p-4 border-t mt-auto">
          <div className="flex justify-between font-bold">
            <span>Subtotal:</span>
            <span>${getSubtotal()}</span>
            <CheckoutButton onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}
