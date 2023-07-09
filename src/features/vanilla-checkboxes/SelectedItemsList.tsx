import React from "react"

interface SelectedItemsListProps {
  data: any[]
  onItemDeselect: (id: number) => void
}

export const SelectedItemsList = ({
  data,
  onItemDeselect,
}: SelectedItemsListProps) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={true}
            onChange={() => onItemDeselect(item.id)}
          />
          {item.name}
        </div>
      ))}
    </div>
  )
}