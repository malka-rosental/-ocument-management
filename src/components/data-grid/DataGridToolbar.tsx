// import type { Document } from 'src/types/documents';

// import { Box, Typography } from '@mui/material';
// import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

// import { ToolbarItemActions } from './ToolbarItemActions';

import { Box, Typography } from '@mui/material';

import { ToolbarItemActions } from './ToolbarItemActions';

interface DataGridToolBarProps {
    title?: string;
}
export const DataGridToolbar = ({ title }: DataGridToolBarProps) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
        <Typography variant="h6">{title}</Typography>
        <ToolbarItemActions />
    </Box>
)

// const CustomToolbar = () => (
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//         <Typography variant="h6">מסמכים אחרונים</Typography>
//         <Button variant="outlined" size="small">פעולה</Button>
//       </Box>
//   );

 export default DataGridToolbar;
