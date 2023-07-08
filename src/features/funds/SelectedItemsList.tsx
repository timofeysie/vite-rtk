import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Fund } from './Fund';

type Props = {
  fundList: Fund[];
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'holdings', headerName: 'Holdings', width: 200 },
];

export const SelectedItemsList = ({ fundList }: Props) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={fundList} columns={columns} />
    </div>
  );
};
