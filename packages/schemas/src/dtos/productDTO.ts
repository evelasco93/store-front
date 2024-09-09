import { VariantDTO } from './variantDTO'

export interface ProductDTO {
  id: string
  name: string
  description?: string
  price: number
  collectionName: string
  collectionId: string
  variants: VariantDTO[] 
}
