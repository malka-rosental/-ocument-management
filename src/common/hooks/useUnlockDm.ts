import { useQuery } from '@tanstack/react-query';

import { fileService } from '../../services/file-service';

import type { DmProfileDetails } from '../../types/DmProfile';
import type { FetchDmProfileParams, UnlockDmParams } from '../../services/file-service';

export const useUnlockDmQuery = (
  enabled: boolean,
  unlockDmParams: UnlockDmParams,
  apiUrl: string
) => useQuery<DmProfileDetails, Error>({
    queryKey: ['docNumber', unlockDmParams.docNum],
    queryFn: () => fileService.unlockDm(apiUrl, unlockDmParams),
    enabled,
    retry: false,
    staleTime: 1000 * 60,
  });
