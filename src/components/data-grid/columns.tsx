import type { GridColDef} from "@mui/x-data-grid";

import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { fDate } from "src/utils/format-time";

import { InfoIcon } from "src/assets/icons/actions-icons/info-icon";
import { EmailIcon } from "src/assets/icons/actions-icons/email-icon";
import { UnlockIcon } from "src/assets/icons/actions-icons/unlock-icon";
import { CopyClipboardIcon } from "src/assets/icons/actions-icons/copy-icon";
import { EditPermissionIcon } from "src/assets/icons/actions-icons/edit-permission-icon";
import { RequestPermissionIcon } from "src/assets/icons/actions-icons/permission-request-icon";

 export const Columns = () => {
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
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '12px' }} component="span"> {params.row.Docname} </Box>
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
                    // onClick={() => openModal(params.row)}
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
 
 }
 