import React, { createContext, useState, useContext, useEffect } from 'react'
import { ICartContextProps, ICartItem } from '../common/types'

const CartContext = createContext<ICartContextProps | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems')
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: ICartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size,
      )
      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i,
        )
      } else {
        return [...prevItems, item]
      }
    })
  }

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          ),
      ),
    )
  }

  const updateQuantity = (
    productId: string,
    color: string,
    size: string,
    quantity: number,
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
