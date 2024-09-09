import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_API_URL } from '../common/constants'
import { ProductDTO } from '@store-front-typescript-bootcamp/schemas'

const fetchProducts = async (
  search: string,
  collectionId: string | null,
  sortBy: string, // Add sortBy parameter
): Promise<{ products: ProductDTO[] }> => {
  const { data } = await axios.get(`${BASE_API_URL}/products`, {
    params: { search, collectionId, sortBy }, // Include sortBy in params
  })
  return data
}

export const useProducts = (
  search: string,
  collectionId: string | null,
  sortBy: string,
) => {
  return useQuery({
    queryKey: ['products', search, collectionId, sortBy], // Include sortBy in queryKey
    queryFn: () => fetchProducts(search, collectionId, sortBy),
  })
}
