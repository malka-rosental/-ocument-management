
// DataGridCustom.tsx
import { Box } from "@mui/material";

import { useRecentDocuments } from './useRecentDocuments';
import { DataGridCustom } from '../data-grid/DataGridCustom';

export function RecentDocuments() {
    const { recentDocuments } = useRecentDocuments();
    return (
        <><Box sx={{
            // zIndex: theme => theme.zIndex,
            position:'fixed',
            left: 0,
            width: '100vw',
            height: '30vh',
            backgroundColor: '#005D9229',
            zIndex: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        }} /><DataGridCustom rows={recentDocuments} /></>
    )
}