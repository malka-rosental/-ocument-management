import { useQuery } from '@tanstack/react-query';

import { fileService } from '../../../services/file-service';

import type { DmProfileDetails } from '../../../types/DmProfile';
import type { FetchDmProfileParams } from '../../../services/file-service';

export const useDmProfileQuery = (
  enabled: boolean,
  profileDetailsParams: FetchDmProfileParams,
  apiUrl: string
) => useQuery<DmProfileDetails, Error>({
    queryKey: ['docNumber', profileDetailsParams.DocNumber],
    queryFn: () => fileService.fetchDmProfileDetails(apiUrl,profileDetailsParams),
    enabled,
    retry: false,
    staleTime: 1000 * 60,
  });
