
// DataGridCustom.tsx



import { useRecentDocuments } from './useRecentDocuments';
import { DataGridCustom } from '../data-grid/DataGridCustom';

export function RecentDocuments() {
    const { recentDocuments } = useRecentDocuments();
    return (<DataGridCustom rows={recentDocuments} />)
}