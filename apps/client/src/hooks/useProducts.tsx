import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_API_URL } from '../common/constants'
import { ProductDTO } from '@store-front-typescript-bootcamp/schemas'

const fetchProducts = async (
  search: string,
  collectionId: string | null,
): Promise<{ products: ProductDTO[] }> => {
  const { data } = await axios.get(`${BASE_API_URL}/products`, {
    params: { search, collectionId },
  })
  return data
}

export const useProducts = (search: string, collectionId: string | null) => {
  return useQuery({
    queryKey: ['products', search, collectionId],
    queryFn: () => fetchProducts(search, collectionId),
  })
}
