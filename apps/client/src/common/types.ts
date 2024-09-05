export interface Option {
    size: string
    stock: number
  }
  
  export interface Variant {
    id: string
    imageUrls: string[]
    color: string
    options: Option[]
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    price: number
    collectionName: string
    variants: Variant[]
  }

  export interface ProductCardProps {
    product: Product
  }