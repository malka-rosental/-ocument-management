import { Paper } from '@mui/material';

// import { DataGridCustom } from 'src/components/data-grid/DataGridCustom';
import { RecentDocuments } from 'src/components/recent-documents/RecentDocuments';
import { ModalProvider } from 'src/components/dm-profile/contexts/ProfileModalContext';


export default function Page() {
  return (
    <ModalProvider>
      <Paper variant="outlined" >
        <RecentDocuments />
      </Paper>
    </ModalProvider>

  );
}


