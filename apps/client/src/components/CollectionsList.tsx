import { ICollectionItemProps } from '../common/types'

export const CollectionItem: React.FC<ICollectionItemProps> = ({
  collection,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`collection-list-item cursor-pointer ${selected ? 'text-blue-600' : 'text-gray-600'}`}
      id={collection.id}
      onClick={() => onClick(collection.id)}
    >
      <p className="collection-item-name text-sm">
        {collection.name.toUpperCase()}
      </p>
    </div>
  )
}

// Adding component for artificial all option since it is not coming from the db
export const AllCollectionItem: React.FC<{
  onClick: () => void
  selectedCollection: boolean
}> = ({ onClick, selectedCollection }) => {
  return (
    <div
      className={`collection-list-item cursor-pointer ${selectedCollection ? 'text-blue-600' : 'text-gray-600'}`}
      onClick={onClick}
    >
      <p className="collection-item-name text-sm">ALL</p>
    </div>
  )
}
