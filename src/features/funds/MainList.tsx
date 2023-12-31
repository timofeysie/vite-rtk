import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid"
import { Fund } from "./Fund"

type Props = {
  fundList: Fund[]
  selectedIds: number[]
  onSelectionChange: (ids: number[]) => void
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "holdings", headerName: "Holdings", width: 200 },
]

export const MainList = ({
  fundList,
  selectedIds,
  onSelectionChange,
}: Props) => {
  const [selectionModel, setSelectionModel] =
    useState<GridRowId[]>(selectedIds)

  const handleSelectionChange = (newSelectionModel: GridRowId[]) => {
    setSelectionModel(newSelectionModel)
    onSelectionChange(newSelectionModel.map(Number))
  }

  useEffect(() => {
    setSelectionModel(fundList.filter((fund) => fund.selected).map((fund) => fund.id));
  }, [fundList]);

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
