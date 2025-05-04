import type { Document } from 'src/types/documents';
import type {
    GridColDef,
    GridSlotProps,
    GridRowSelectionModel,
    GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import {
    DataGrid,
    gridClasses,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { fDate } from 'src/utils/format-time';

import apiService from 'src/services/api-service';
import { PdfFileIcon } from 'src/assets/icons/files/pdf-file-icon';
//Icons
import { InfoIcon } from 'src/assets/icons/actions-icons/info-icon';
import { EmailIcon } from 'src/assets/icons/actions-icons/email-icon';
import { UnlockIcon } from 'src/assets/icons/actions-icons/unlock-icon';
import { CopyClipboardIcon } from 'src/assets/icons/actions-icons/copy-icon';
import { EditPermissionIcon } from 'src/assets/icons/actions-icons/edit-permission-icon';
import { RequestPermissionIcon } from 'src/assets/icons/actions-icons/permission-request-icon';

// eslint-disable-next-line import/no-unresolved
import { EmptyContent } from 'src/components/empty-content';

import { DmProfileDetailsModal } from './DmProfileDetailsModal';
// ----------------------------------------------------------------------
const fileIcons = {
    pdf: <PdfFileIcon />,
};


const HIDE_COLUMNS = { id: true };


export function DataGridCustom() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Document | null>(null);

    const [documents, setDocuments] = useState<Document[]>([]);
    const baseColumns: GridColDef[] = [
        {
            type: 'string',
            field: 'Docname',
            headerName: 'שם מסמך',
            flex: 0.25,
            renderCell: (params) => (
                <Box
                    sx={{
                        gap: 0.5,
                        height: 1,
                        lineHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '12px' }} component="span"> {fileIcons.pdf} {params.row.Docname} </Box>
                </Box>
            ),
        },
        {
            type: 'string',
            field: 'CreateDate',
            headerName: 'נוצר',
            flex: 0.1,
            renderCell: (params) => (
                <Box
                    sx={{
                        gap: 0.5,
                        height: 1,
                        lineHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box component="span">{fDate(params.row.CreateDate, 'DD/MM/YYYY')}</Box>
                </Box>
            ),
        },
        {
            type: 'string',
            field: 'AuthorUserName',
            headerName: 'מחבר',
            flex: 0.15,
            renderCell: (params) => (
                <Box
                    sx={{
                        gap: 0.5,
                        height: 1,
                        lineHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box component="span">{params.row.AuthorUserName}</Box>
                </Box>
            ),
        },
        {
            type: 'string',
            field: 'Docnumber',
            headerName: 'מספר מסמך',
            flex: 0.1,
            renderCell: (params) => (
                <Box
                    sx={{
                        gap: 0.5,
                        height: 1,
                        lineHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box component="span">{params.row.Docnumber}</Box>
                </Box>
            ),
        },
        {
            type: 'string',
            field: 'Library',
            headerName: 'ספריה',
            // align: 'right',
            // headerAlign: 'right',
            flex: 0.1,
            renderCell: (params) => (
                <Box
                    sx={{
                        gap: 0.5,
                        height: 1,
                        lineHeight: 1,
                        display: 'flex',
                        textAlign: 'right',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box component="span">{params.row.Library}</Box>
                </Box>
            ),
        },
        {
            type: 'actions',
            field: 'actions',
            headerName: '',
            align: 'right',
            flex: 0.25,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<InfoIcon />}
                    label="Info"
                    onClick={() => openModal(params.row)}
                />,
                <GridActionsCellItem
                    icon={<EditPermissionIcon />}
                    label="Edit permission"
                    onClick={() => console.info('Edit permission', params.row.Docnumber)}
                />,
                <GridActionsCellItem
                    icon={<EmailIcon />}
                    label="Email"
                    onClick={() => console.info('Email', params.row.Docnumber)}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<CopyClipboardIcon />}
                    label="העתק קישור"
                    sx={{ direction: 'rtl' }}
                    onClick={() => console.log('DELETE', params.row.Docnumber)}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<UnlockIcon />}
                    label="שחרור מסמך"
                    sx={{ direction: 'rtl' }}
                    onClick={() => console.log('Unlock', params.row.Docnumber)}
                />,
                <GridActionsCellItem
                    showInMenu
                    icon={<RequestPermissionIcon />}
                    label=" בקשת הרשאות"
                    sx={{ direction: 'rtl' }}
                    onClick={() => console.log('Request pernission', params.row.Docnumber)}
                />,

            ],
        },
    ];
    const openModal = (row: Document) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await apiService.get<Document[]>('/DMLinkAPI/api/dmsearch/getrecentuserdocs');
                setDocuments(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDocuments();
    }, [documents]);

    const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

    const columns = useMemo(
        () =>
            baseColumns,
        []
    );

    // const getTogglableColumns = () =>
    //     columns
    //         .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
    //         .map((column) => column.field);

    const selected = documents.filter((document) => selectedRows.includes(document.Docnumber)).map((_row) => _row.Docnumber);

    console.info('SELECTED ROWS', selected);

    return (
        <><DataGrid
            disableRowSelectionOnClick
            rows={documents}
            columns={columns}
            getRowId={(row) => row.Docnumber}
            onRowSelectionModelChange={(newSelectionModel) => {
                setSelectedRows(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            // initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            // pageSizeOptions={[5, 10, 20, 50, { value: -1, label: 'All' }]}
            slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: () => <EmptyContent />,
                noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
                panel: { anchorEl: filterButtonEl },
                // toolbar: { setFilterButtonEl, showQuickFilter: true },
                // columnsManagement: { getTogglableColumns },
            }}
            sx={{
                [`& .${gridClasses.cell}`]: {
                    alignItems: 'center',
                    display: 'inline-flex',
                },
            }} />
            {selectedRow &&
                <DmProfileDetailsModal open={isModalOpen} onClose={closeModal} docNumber={selectedRow!.Docnumber} docLibrary={selectedRow!.Library} />
            }</>

    );
}

// ----------------------------------------------------------------------

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
    }
}

function CustomToolbar({ setFilterButtonEl }: GridSlotProps['toolbar']) {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
            <Box sx={{ flexGrow: 1 }} />
            {/* <GridToolbarColumnsButton /> */}
            {/* <GridToolbarFilterButton ref={setFilterButtonEl} /> */}
            {/* <GridToolbarDensitySelector /> */}
            {/* <GridToolbarExport /> */}
        </GridToolbarContainer>
    );
}

// ----------------------------------------------------------------------



