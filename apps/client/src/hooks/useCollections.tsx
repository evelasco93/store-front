import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_API_URL } from '../common/constants'
import { CollectionDTO } from '@store-front-typescript-bootcamp/schemas'

const fetchCollections = async (): Promise<{
  collections: CollectionDTO[]
}> => {
  const { data } = await axios.get(`${BASE_API_URL}/collections`)
  return data
}

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections,
  })
}
