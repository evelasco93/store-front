import { OptionDTO } from './optionDTO'

export interface VariantDTO {
  id: string
  color: string
  imageUrls: string[]
  options: OptionDTO[]
}
