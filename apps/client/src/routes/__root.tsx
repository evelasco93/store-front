import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FiHome, FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { CartProvider } from '../context/CartContext'
import { CartModal } from '../components/CartModal'
import { CartIcon } from '../components/CartIcon'

const queryClient = new QueryClient()

const RootLayout: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="nav-bar-global p-2 flex justify-end items-center pt-5 mr-2">
          <div className="flex gap-4">
            <Link
              to="/"
              className="flex items-center hover:text-blue-600 [&.active]:text-blue-600"
            >
              <FiHome size={24} />
            </Link>
            <Link
              to="/search"
              className="flex items-center hover:text-blue-600 [&.active]:text-blue-600"
            >
              <FiSearch size={24} />
            </Link>
            <CartIcon onClick={() => setCartOpen(true)} />
          </div>
        </div>
        <Outlet />
        {isCartOpen && <CartModal onClose={() => setCartOpen(false)} />}
      </CartProvider>
    </QueryClientProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
