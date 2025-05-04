// DataGridColumns.ts
import type { GridColDef } from '@mui/x-data-grid';
import type { Document } from 'src/types/documents';

import { Box } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { fDate } from 'src/utils/format-time';

import { PdfFileIcon } from 'src/assets/icons/files/pdf-file-icon';
import { InfoIcon, EmailIcon, UnlockIcon, CopyClipboardIcon, EditPermissionIcon, RequestPermissionIcon } from 'src/assets/icons/actions-icons';

const fileIcons = {
  pdf: <PdfFileIcon />,
};

export const getColumns = (openModal: (row: Document) => void): GridColDef[] => [
  {
    field: 'Docname',
    headerName: 'שם מסמך',
    flex: 0.25,
    renderCell: ({ row }) => (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Box display="flex" alignItems="center" columnGap="12px">
          {fileIcons.pdf} {row.Docname}
        </Box>
      </Box>
    ),
  },
  {
    field: 'CreateDate',
    headerName: 'נוצר',
    flex: 0.1,
    renderCell: ({ row }) => (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <span>{fDate(row.CreateDate, 'DD/MM/YYYY')}</span>
      </Box>
    ),
  },
  {
    field: 'AuthorUserName',
    headerName: 'מחבר',
    flex: 0.15,
    renderCell: ({ row }) => (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <span>{row.AuthorUserName}</span>
      </Box>
    ),
  },
  {
    field: 'Docnumber',
    headerName: 'מספר מסמך',
    flex: 0.1,
    renderCell: ({ row }) => (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <span>{row.Docnumber}</span>
      </Box>
    ),
  },
  {
    field: 'Library',
    headerName: 'ספריה',
    flex: 0.1,
    renderCell: ({ row }) => (
      <Box display="flex" flexDirection="column" justifyContent="center">
        <span>{row.Library}</span>
      </Box>
    ),
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: '',
    flex: 0.25,
    getActions: ({ row }) => [
      <GridActionsCellItem icon={<InfoIcon />} label="Info" onClick={() => openModal(row)} />,
      <GridActionsCellItem icon={<EditPermissionIcon />} label="Edit permission" onClick={() => console.info('Edit permission', row.Docnumber)} />,
      <GridActionsCellItem icon={<EmailIcon />} label="Email" onClick={() => console.info('Email', row.Docnumber)} />,
      <GridActionsCellItem showInMenu icon={<CopyClipboardIcon />} label="העתק קישור" onClick={() => console.log('Copy', row.Docnumber)} />,
      <GridActionsCellItem showInMenu icon={<UnlockIcon />} label="שחרור מסמך" onClick={() => console.log('Unlock', row.Docnumber)} />,
      <GridActionsCellItem showInMenu icon={<RequestPermissionIcon />} label=" בקשת הרשאות" onClick={() => console.log('Request', row.Docnumber)} />,
    ],
  },
];
