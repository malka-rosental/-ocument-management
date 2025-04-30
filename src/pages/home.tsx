import { Paper } from '@mui/material';

import { _mock } from 'src/_mock';
import { CONFIG } from 'src/global-config';
import { _documents } from 'src/_mock/_documents';

import { DataGridCustom } from 'src/components/data-grid/data-grid-custom';


export default function Page() {
  return (
    <Paper variant="outlined" sx={{ height: 640 }}>
    <DataGridCustom data={_documents} />
  </Paper>
  );
}
