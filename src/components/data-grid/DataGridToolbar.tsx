import { Box } from '@mui/material';
// DataGridToolbar.tsx
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

export function DataGridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
    </GridToolbarContainer>
  );
}
