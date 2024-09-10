import React from 'react'
import { usePageTitle } from '../hooks/usePageTitle'

export const CheckoutPage: React.FC = () => {
  usePageTitle('Checkout')
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src="https://i.kym-cdn.com/entries/icons/original/000/005/574/takemymoney.jpg"
        alt="Checkout Placeholder"
        className="max-w-full max-h-full"
      />
    </div>
  )
}
