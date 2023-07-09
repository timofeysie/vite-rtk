import { useState, useEffect } from "react"
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { Fund } from "./Fund"

type Props = {
  selectedFunds: Fund[]
  onSelectionChange: (ids: number[]) => void
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "holdings", headerName: "Holdings", width: 200 },
]

export const SelectedItemsList = ({ 
  selectedFunds, 
  onSelectionChange 
}: Props) => {
  const [selectionModel, setSelectionModel] = 
    useState<GridRowId[]>(selectedFunds.map((fund) => fund.id),
  )

  /**
   * Make sure the selected funds have their checkboxes selected on 
   */
  useEffect(() => {
    const selected =  selectedFunds.filter((fund) => fund.selected);
    const selectedIds = selected.map((fund) => fund.id);
    setSelectionModel(selectedIds);
  }, [selectedFunds]);

  const handleSelectionChange = (newSelectionModel: GridRowId[]) => {
    setSelectionModel(newSelectionModel)
    const newMap = newSelectionModel.map(Number);
    onSelectionChange(newMap)
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={selectedFunds}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectionModel}
      />
    </div>
  )
}
