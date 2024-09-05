import { VariantDTO } from './variantDTO'

export interface ProductDTO {
  id: string
  name: string
  description?: string
  price: number
  variants: VariantDTO[]
  collectionName: string
}
