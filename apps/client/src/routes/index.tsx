import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../pages/HomePage'

export const Route = createFileRoute('/')({
  component: Home,
})
