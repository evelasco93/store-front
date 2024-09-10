import React, { useState, KeyboardEvent } from 'react'
import { ISearchBarProps } from '../common/types'

export const SearchBar: React.FC<ISearchBarProps> = ({ onSearch, value }) => {
  const [query, setQuery] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(query)
    }
  }

  return (
    <div className="search-bar mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="SEARCH FOR AN ITEM, COLOR, COLLECTION..."
        className="w-full p-2 border rounded-lg"
      />
    </div>
  )
}
