import { CollectionDTO, ProductDTO } from "@store-front-typescript-bootcamp/schemas"

  export interface IProductCardProps {
    product: ProductDTO
  }

  export interface ICollectionListProps {
    collection: CollectionDTO
  }

  export interface ISearchBarProps {
    onSearch: (query: string) => void
    value: string
  }

  export interface ISortOptionsProps {
    sortBy: string;
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}