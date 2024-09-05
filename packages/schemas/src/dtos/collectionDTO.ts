import { ProductDTO } from './productDTO'

export interface CollectionDTO {
  id: string
  name: string
  description?: string
  products: ProductDTO[]
}
