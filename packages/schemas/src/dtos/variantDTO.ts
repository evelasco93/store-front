import { OptionDTO } from './optionDTO'

export interface VariantDTO {
  id: string
  color: string
  colorCode: string
  imageUrls: string[]
  options: OptionDTO[]
}
