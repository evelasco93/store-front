import React from 'react'
import { ISortOptionsProps } from '../common/types'

export const SortOptions: React.FC<ISortOptionsProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="sort-options">
      <select
        value={sortBy}
        onChange={onSortChange}
        className="p-2 border rounded-lg"
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
      </select>
    </div>
  )
}
