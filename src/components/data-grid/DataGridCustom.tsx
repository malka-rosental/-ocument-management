import type { Document } from 'src/types/documents';

import { useMemo } from 'react';

import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

// eslint-disable-next-line import/no-unresolved
import { EmptyContent } from 'src/components/empty-content';

import { getColumns } from './DataGridColumns';
import { DataGridToolbar } from './DataGridToolbar';
import { useDmActions } from '../../common/hooks/useDmActions';
import { DmProfileDetailsModal } from '../dm-profile/DmProfileDetailsModal';
import { useModalContext } from '../dm-profile/contexts/ProfileModalContext';

export function DataGridCustom({ rows }: { rows: Document[] }) {
    const { selectedRow, setSelectedRow } = useModalContext();
    const { handleRowAction, getDmPreviewUrl } = useDmActions()
    const columns = useMemo(() => getColumns(getDmPreviewUrl, handleRowAction), []);

    return (
        <>
            <Box sx={{ height: 'calc(100vh - var(--layout-header-desktop-height))', overflow: 'auto', padding: '0 40px 40px 40px' }}>
                <DataGrid
                    hideFooter
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.Docnumber}
                    onRowClick={(params) => setSelectedRow(params.row)}
                    rowSelectionModel={selectedRow ? [selectedRow.Docnumber] : []}
                    // onRowSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
                    disableRowSelectionOnClick
                    slots={{
                        toolbar: () => <DataGridToolbar title='מסמכים אחרונים' selectedRow={selectedRow ?? null} />,
                        noRowsOverlay: () => <EmptyContent />,
                        noResultsOverlay: () => <EmptyContent title="No results found" />,
                    }}
                    sx={{
                        '& .MuiDataGrid-main': {
                            borderRadius: 2,
                        },
                        [`& .${gridClasses.cell}`]: {
                            alignItems: 'center',
                            display: 'inline-flex',
                        },
                    }}
                />
            </Box>
            {selectedRow && <DmProfileDetailsModal />}
        </>
    );
}
