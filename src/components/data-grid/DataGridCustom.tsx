import type { Document } from 'src/types/documents';

// DataGridCustom.tsx
import { useMemo, useState } from 'react';

import { DataGrid, gridClasses } from '@mui/x-data-grid';

// eslint-disable-next-line import/no-unresolved
import { EmptyContent } from 'src/components/empty-content';

import { useDocuments } from './useDocuments';
import { getColumns } from './DataGridColumns';
import { DataGridToolbar } from './DataGridToolbar';
import { DmProfileDetailsModal } from './DmProfileDetailsModal';

export function DataGridCustom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Document | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: true });

  const { documents } = useDocuments();

  const openModal = (row: Document) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const columns = useMemo(() => getColumns(openModal), []);

  return (
    <>
      <DataGrid
        rows={documents}
        columns={columns}
        getRowId={(row) => row.Docnumber}
        onRowSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
        disableRowSelectionOnClick
        slots={{
          toolbar: DataGridToolbar,
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results found" />,
        }}
        sx={{
          [`& .${gridClasses.cell}`]: {
            alignItems: 'center',
            display: 'inline-flex',
          },
        }}
      />
      {selectedRow && (
        <DmProfileDetailsModal
          open={isModalOpen}
          onClose={closeModal}
          docNumber={selectedRow.Docnumber}
          docLibrary={selectedRow.Library}
        />
      )}
    </>
  );
}
