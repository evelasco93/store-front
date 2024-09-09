import { CollectionDTO, ProductDTO } from "@store-front-typescript-bootcamp/schemas"

  export interface IProductCardProps {
    product: ProductDTO
  }

  export interface ICollectionListProps {
    collection: CollectionDTO
  }

  export interface SearchBarProps {
    onSearch: (query: string) => void;
  }