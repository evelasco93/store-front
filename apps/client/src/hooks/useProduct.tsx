import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Product } from '../common/types'
import { BASE_API_URL } from '../common/constants'

const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`${BASE_API_URL}/products/${id}`)
  return data.product
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => fetchProduct(id),
  })
}
