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
        <option className="filter-option-item" value="name-asc">
          Name A-Z
        </option>
        <option className="filter-option-item" value="name-desc">
          Name Z-A
        </option>
        <option className="filter-option-item" value="price-asc">
          Price Low to High
        </option>
        <option className="filter-option-item" value="price-desc">
          Price High to Low
        </option>
      </select>
    </div>
  )
}
