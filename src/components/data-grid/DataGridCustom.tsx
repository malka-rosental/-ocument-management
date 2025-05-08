import type { Document } from 'src/types/documents';

import { useMemo } from 'react';

import { Box, styled } from '@mui/material';
import { gridClasses, DataGridPro } from '@mui/x-data-grid-pro';

import { getColumns } from './DataGridColumns';
import { EmptyContent } from '../empty-content';
import DataGridToolbar from './DataGridToolbar';
import { useDmActions } from '../../common/hooks/useDmActions';
import { DmProfileDetailsModal } from '../dm-profile/DmProfileDetailsModal';
import { useModalContext } from '../dm-profile/contexts/ProfileModalContext';

const customLocaleText = {
    columnMenuSortAsc: ' Asc מיון',
    columnMenuSortDesc: 'Desc מיון ',
    columnMenuFilter: 'סינון',
    columnMenuHideColumn: 'הסתר שדות',
    columnMenuManageColumns: 'הגדרת שדות',
};
export function DataGridCustom({ rows }: { rows: Document[] }) {
    const { selectedRow, setSelectedRow } = useModalContext();
    const { handleRowAction, getDmPreviewUrl } = useDmActions()
    const columns = useMemo(() => getColumns(getDmPreviewUrl, handleRowAction), []);

    const DataGridWrapper = styled(Box)(({ theme }) => ({
        height: 'calc(100vh - var(--layout-header-desktop-height))',
        overflow: 'auto',
        padding: '16px 40px 40px',
        '& .MuiDataGrid-root .MuiDataGrid-main': {
            backgroundColor: '#ffffff',
        },
    }));
    return (
        <>
            <DataGridWrapper>
                <DataGridPro
                    showToolbar
                    localeText={customLocaleText}
                    hideFooter
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.Docnumber}
                    onRowClick={(params) => setSelectedRow(params.row)}
                    // rowSelectionModel={selectedRow ? [selectedRow.Docnumber] : []}
                    // onRowSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
                    disableRowSelectionOnClick
                    // slots={{
                    //     toolbar: () => <DataGridToolbar title='מסמכים אחרונים' selectedRow={selectedRow ?? null} />,
                    //     noRowsOverlay: () => <EmptyContent />,
                    //     noResultsOverlay: () => <EmptyContent title="No results found" />,
                    // }}
                    slots={{
                        toolbar: DataGridToolbar,
                        noRowsOverlay: () => <EmptyContent />,
                        noResultsOverlay: () => <EmptyContent title="No results found" />,
                    }}
                    slotProps={{
                        toolbar: {
                            title: 'מסמכים אחרונים',
                        },
                    }}
                    sx={[
                        (theme) => ({
                            zIndex: 20,
                            '& .MuiDataGrid-main': {
                                borderRadius: 2,
                                boxShadow: theme.vars.customShadows.z8,
                            },
                            [`& .${gridClasses.cell}`]: {
                                alignItems: 'center',
                                display: 'inline-flex',
                            },
                        }),
                    ]}
                />
            </DataGridWrapper >
            {selectedRow && <DmProfileDetailsModal />
            }
        </>
    );
}
