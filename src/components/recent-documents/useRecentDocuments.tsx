import type { Document } from 'src/types/documents';

import { useState, useEffect } from 'react';

import apiService from 'src/services/api-service';
import { useConfig } from 'src/contexts/ConfigContext';

export function useRecentDocuments() {
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const {getRecentDmApi} = useConfig();
  useEffect(() => {
    const fetchRecentDocuments = async () => {
      try {
        const data = await apiService.get<Document[]>(`${getRecentDmApi}/DMLinkAPI/api/dmsearch/getrecentuserdocs`);
        setRecentDocuments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentDocuments();
  }, []);

  return { recentDocuments, loading };
}
