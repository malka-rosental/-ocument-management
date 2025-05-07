/* eslint-disable import/no-unresolved */
import type { JSX } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import type { Document } from 'src/types/documents';

import { Box, Link } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { fDate } from 'src/utils/format-time';

import {
  PdfFileIcon, WordFileIcon, MailFileIcon,
  ExcelFileIcon, OutlookFileIcon,
} from 'src/assets/icons/files';
import {
  InfoIcon, EmailIcon, UnlockIcon,
  CopyClipboardIcon, EditPermissionIcon, RequestPermissionIcon
} from 'src/assets/icons/actions-icons';

import { type RowActionType } from '../../common/hooks/useDmActions';


const fileIcons: Record<string, JSX.Element> = {
  pdf: <PdfFileIcon />,
  excel: <ExcelFileIcon />,
  word: <WordFileIcon />,
  mail: <MailFileIcon />,
  outlook: <OutlookFileIcon />,
};

const menuCellItemSx = { direction: 'rtl', columnGap: 2 };

const getFileIcon = (application: string): JSX.Element => {
  const key = application?.split(' ')?.[1]?.toLowerCase();
  return fileIcons[key] ?? <PdfFileIcon />;
};

export const getColumns = (getDmPreviewUrl: (row: Document) => string ,handleRowAction: (action: RowActionType, row: Document) => void): GridColDef[] => {
  const baseColumns: GridColDef[] = [
    {

      field: 'Docname',
      headerName: 'שם מסמך',
      flex: 0.25,
      renderCell: ({ row }) => (
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box display="flex" alignItems="center" columnGap="12px">
            <Link
              href={ getDmPreviewUrl(row)}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="primary"
              sx={{ cursor: 'pointer' }}
            >
              {getFileIcon(row.Application)} {row.Docname}
            </Link>
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
  ];


  const actionsColumn: GridColDef = {
    field: 'actions',
    type: 'actions',
    align: 'right',
    flex: 0.25,
    getActions: ({ row }) => [
      <GridActionsCellItem icon={<InfoIcon />} label="Info" onClick={() => handleRowAction('profileInfo', row)} />,
      <GridActionsCellItem icon={<EditPermissionIcon />} label="Edit permission" onClick={() => handleRowAction('editPermission', row)} />,
      <GridActionsCellItem icon={<EmailIcon />} label="Email" onClick={() => handleRowAction('sendEmail', row)} />,
      <GridActionsCellItem sx={menuCellItemSx} showInMenu icon={<CopyClipboardIcon />} label="העתק קישור" onClick={() => handleRowAction('copyUrl', row)} />,
      <GridActionsCellItem sx={menuCellItemSx} showInMenu icon={<UnlockIcon />} label="שחרור מסמך" onClick={() => handleRowAction('unlock', row)} />,
      <GridActionsCellItem sx={menuCellItemSx} showInMenu icon={<RequestPermissionIcon />} label="בקשת הרשאות" onClick={() => handleRowAction('requestPermission', row)} />,
    ],
  };

  return [...baseColumns, actionsColumn];
};
