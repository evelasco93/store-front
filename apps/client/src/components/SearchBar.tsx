import React, { useState } from 'react'
import { SearchBarProps } from '../common/types'

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <div className="search-bar mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="SEARCH FOR AN ITEM, COLOR, COLLECTION..."
        className="w-full max-w-xl p-2 border rounded-lg"
      />
    </div>
  )
}
