import type { Document } from 'src/types/documents';
import type { RatingProps } from '@mui/material/Rating';
import type {
    GridColDef,
    GridSlotProps,
    GridFilterItem,
    GridFilterOperator,
    GridRowSelectionModel,
    GridColumnVisibilityModel,
    GridFilterInputValueProps,
} from '@mui/x-data-grid';

import { useRef, useMemo, useState, useImperativeHandle } from 'react';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {
    DataGrid,
    gridClasses,
    GridToolbarExport,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { fDate } from 'src/utils/format-time';

import { PdfFileIcon } from 'src/assets/icons/files/pdf-file-icon';

import { Iconify } from 'src/components/iconify';
// eslint-disable-next-line import/no-unresolved
import { EmptyContent } from 'src/components/empty-content';
// ----------------------------------------------------------------------
const fileIcons = {
    pdf: <PdfFileIcon />,
  };
const baseColumns: GridColDef[] = [
    {
        type: 'actions',
        field: 'actions',
        headerName: '',
        align: 'left',
        flex: 0.25,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<Iconify icon="solar:lock-password-outline" />}
                label="View"
                onClick={() => console.info('VIEW', params.row.Docnumber)}
            />,
            <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                onClick={() => console.info('EDIT', params.row.Docnumber)}
            />,
            <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => console.info('DELETE', params.row.Docnumber)}
                sx={{ color: 'error.main' }}
            />,

        ],
    },
    {
        type: 'string',
        field: 'Library',
        headerName: 'ספריה',
        align: 'right',
        headerAlign: 'right',
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
        type: 'string',
        field: 'Docnumber',
        headerName: 'מספר מסמך',
        align: 'right',
        flex: 0.1,
        headerAlign: 'right',
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
                <Box component="span">{params.row.Docnumber}</Box>
            </Box>
        ),
    },
    {
        type: 'string',
        field: 'AuthorUserName',
        headerName: 'מחבר',
        align: 'right',
        headerAlign: 'right',
        flex: 0.15,
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
                <Box component="span">{params.row.AuthorUserName}</Box>
            </Box>
        ),
    },
    {
        type: 'string',
        field: 'CreateDate',
        headerName: 'נוצר',
        align: 'right',
        headerAlign: 'right',
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
                <Box component="span">{fDate(params.row.CreateDate, 'DD/MM/YYYY')}</Box>
            </Box>
        ),
    },
    {
        type: 'string',
        field: 'Docname',
        headerName: 'שם מסמך',
        align: 'right',
        flex: 0.25,
        headerAlign: 'right',
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

                <Box sx={{display: 'flex', alignItems: 'center'}} component="span">{params.row.Docname} {fileIcons.pdf}</Box>
            </Box>
        ),
    },




];

// ----------------------------------------------------------------------

type Props = {
    data: Document[];
};

const HIDE_COLUMNS = { id: true };

const HIDE_COLUMNS_TOGGLABLE: string | string[] = [
    'id', 'actions'
];

export function DataGridCustom({ data: rows }: Props) {
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

    const selected = rows.filter((row) => selectedRows.includes(row.Docnumber)).map((_row) => _row.Docnumber);

    console.info('SELECTED ROWS', selected);

    return (
        <DataGrid
            // checkboxSelection
            disableRowSelectionOnClick
            rows={rows}
            columns={columns}
            getRowId={(row) => row.Docnumber}
            onRowSelectionModelChange={(newSelectionModel) => {
                setSelectedRows(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 20, 50, { value: -1, label: 'All' }]}
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
            }}
        />
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
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton ref={setFilterButtonEl} />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

// ----------------------------------------------------------------------

function RatingInputValue({ item, applyValue, focusElementRef }: GridFilterInputValueProps) {
    const ratingRef = useRef<any>(null);

    useImperativeHandle(focusElementRef, () => ({
        focus: () => {
            ratingRef.current.querySelector(`input[value="${Number(item.value) || ''}"]`).focus();
        },
    }));

    const handleFilter: RatingProps['onChange'] = (event, newValue) => {
        applyValue({ ...item, value: newValue });
    };

    return (
        <Rating
            ref={ratingRef}
            precision={0.5}
            value={Number(item.value)}
            onChange={handleFilter}
            name="custom-rating-filter-operator"
            sx={{ ml: 2 }}
        />
    );
}

const ratingOnlyOperators: GridFilterOperator[] = [
    {
        label: 'Above',
        value: 'above',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.field || !filterItem.value || !filterItem.operator) {
                return null;
            }

            return (params): boolean => Number(params.value) >= Number(filterItem.value);
        },
        InputComponent: RatingInputValue,
        InputComponentProps: { type: 'number' },
        getValueAsString: (value: number) => `${value} Stars`,
    },
];
