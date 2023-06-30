/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { MainList } from "./MainList"
import { SelectedItemsList } from "./SelectedItemsList"
import data from "./data.json"
import { Card, CardContent, Grid } from "@mui/material"

export const ParentComponent = () => {
  const [selectedItems, setSelectedItems] = useState(
    data.filter((item) => item.selected),
  )

  const handleItemSelect = (id: number) => {
    const selectedItem = data.find((item) => item.id === id)
    if (selectedItem && !selectedItems.some((item) => item.id === id)) {
      setSelectedItems([...selectedItems, selectedItem])
    }
  }

  const handleItemDeselect = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <MainList
              data={data}
              onItemSelect={handleItemSelect}
              onItemDeselect={handleItemDeselect}
              selectedItems={selectedItems}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <SelectedItemsList
              data={selectedItems}
              onItemDeselect={handleItemDeselect}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
