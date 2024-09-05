import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_API_URL } from '../common/constants'
import { ProductDTO } from '@store-front-typescript-bootcamp/schemas'

const fetchProduct = async (id: string): Promise<ProductDTO> => {
  const { data } = await axios.get(`${BASE_API_URL}/products/${id}`)
  return data.product
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => fetchProduct(id),
  })
}
