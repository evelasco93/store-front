import React from 'react'
import { useRouter } from '@tanstack/react-router'
import { ICheckoutButtonProps } from '../common/types'

export const CheckoutButton: React.FC<ICheckoutButtonProps> = ({ onClose }) => {
  const router = useRouter()

  const handleClick = () => {
    router.navigate({ to: '/checkout' })
    onClose()
  }

  return (
    <button
      onClick={handleClick}
      className="mt-2 px-2 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Checkout
    </button>
  )
}
