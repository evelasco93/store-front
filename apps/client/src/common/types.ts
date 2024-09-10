import { CollectionDTO, ProductDTO } from "@store-front-typescript-bootcamp/schemas"

  export interface IProductCardProps {
    product: ProductDTO
  }

  export interface ICollectionListProps {
    collection: CollectionDTO
  }

  export interface ICollectionItemProps extends ICollectionListProps {
    onClick: (collectionId: string | null) => void
    selected: boolean
  }

  export interface ISearchBarProps {
    onSearch: (query: string) => void
    value: string
  }

  export interface ISortOptionsProps {
    sortBy: string;
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


export interface IProductImageSlider {
  images: string[];
  color: string;
}

export interface ICartItem {
  productId: string;
  name: string;
  color: string;
  size: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface ICartContextProps {
  cartItems: ICartItem[]
  addToCart: (item: ICartItem) => void
  removeFromCart: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
}

export interface IAddToCartButtonProps {
  productId: string
  name: string
  color: string
  size: string | null
  price: number
  imageUrl: string
  quantity: number
  disabled: boolean
}

export interface ICheckoutButtonProps {
  onClose: () => void
}