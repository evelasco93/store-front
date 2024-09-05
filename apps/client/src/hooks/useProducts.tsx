import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Product } from '../common/types'
import { BASE_API_URL } from '../common/constants'

const fetchProducts = async (): Promise<{ products: Product[] }> => {
  const { data } = await axios.get(`${BASE_API_URL}/products`)
  return data
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}
