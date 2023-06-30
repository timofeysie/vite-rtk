/* eslint-disable prettier/prettier */
import React, { useState } from "react"

interface MainListProps {
  data: any[]
  onItemSelect: (id: number) => void
  selectedItems: any[]
}

export const MainList = ({
  data,
  onItemSelect,
  selectedItems,
}: MainListProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      {filteredData.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id,
            )}
            onChange={() => onItemSelect(item.id)}
          />
          {item.name}
        </div>
      ))}
    </div>
  )
}
