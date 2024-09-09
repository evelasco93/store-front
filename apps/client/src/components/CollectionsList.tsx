import { ICollectionListProps } from '../common/types'
import { Link } from '@tanstack/react-router'

export const CollectionItem: React.FC<ICollectionListProps> = ({
  collection,
}) => {
  return (
    <Link className="block">
      <div className="collection-item" id={collection.id}>
        <p className="collection-item-name text-sm text-gray-600">
          {collection.name.toUpperCase()}
        </p>
      </div>
    </Link>
  )
}
