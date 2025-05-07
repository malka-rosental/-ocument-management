import type { Document } from 'src/types/documents';

import { Box, Typography } from '@mui/material';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

import { ToolbarItemActions } from './ToolbarItemActions';

interface DataGridToolBarProps {
    title: string;
    selectedRow: Document | null;
}
export function DataGridToolbar({ title, selectedRow }: DataGridToolBarProps) {
    return (
        <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <GridToolbarQuickFilter />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                <Typography variant="h6">{title}</Typography>
                 <ToolbarItemActions />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
        </GridToolbarContainer>
    );
}
