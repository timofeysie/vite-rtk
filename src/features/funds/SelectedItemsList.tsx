import { useState } from "react"
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { Fund } from "./Fund"

type Props = {
  fundList: Fund[]
  onSelectionChange: (ids: number[]) => void
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "holdings", headerName: "Holdings", width: 200 },
]

export const SelectedItemsList = ({ 
  fundList, 
  onSelectionChange 
}: Props) => {
  console.log('fundList', fundList)
  const [selectionModel, setSelectionModel] = 
    useState<GridRowId[]>(fundList.map((fund) => fund.id),
  )

  const handleSelectionChange = (newSelectionModel: GridRowId[]) => {
    setSelectionModel(newSelectionModel)
    onSelectionChange(newSelectionModel.map(Number))
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={fundList}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        rowSelectionModel={selectionModel}
      />
    </div>
  )
}
