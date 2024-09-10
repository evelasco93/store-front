import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_API_URL } from '../common/constants'
import { ProductDTO } from '@store-front-typescript-bootcamp/schemas'

const fetchProducts = async (
  search: string,
  collectionId: string | null,
  sortBy: string,
): Promise<{ products: ProductDTO[] }> => {
  const { data } = await axios.get(`${BASE_API_URL}/products`, {
    params: { search, collectionId, sortBy },
  })
  return data
}

export const useProducts = (
  search: string,
  collectionId: string | null,
  sortBy: string,
) => {
  return useQuery({
    queryKey: ['products', search, collectionId, sortBy],
    queryFn: () => fetchProducts(search, collectionId, sortBy),
  })
}
