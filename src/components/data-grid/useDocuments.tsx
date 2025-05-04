import type { Document } from 'src/types/documents';

// useDocuments.ts
import { useState, useEffect } from 'react';

import apiService from 'src/services/api-service';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await apiService.get<Document[]>('/DMLinkAPI/api/dmsearch/getrecentuserdocs');
        setDocuments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, loading };
}
