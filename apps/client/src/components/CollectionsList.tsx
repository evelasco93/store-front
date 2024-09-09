import { ICollectionListProps } from '../common/types'

interface CollectionItemProps extends ICollectionListProps {
  onClick: (collectionId: string | null) => void // Updated type to accept null
}

export const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  onClick,
}) => {
  return (
    <div
      className="collection-list-item cursor-pointer"
      id={collection.id}
      onClick={() => onClick(collection.id)}
    >
      <p className="collection-item-name text-sm text-gray-600">
        {collection.name.toUpperCase()}
      </p>
    </div>
  )
}

// Adding component for artificial all option since it is not coming from the db
export const AllCollectionItem: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div className="collection-list-item cursor-pointer" onClick={onClick}>
      <p className="collection-item-name text-sm text-gray-600">ALL</p>
    </div>
  )
}
