import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Dialog, Button, Typography, DialogTitle,
  DialogContent, DialogActions, CircularProgress
} from '@mui/material';

import { useUser } from '../../contexts/UserContext';
import { fileService } from '../../services/file-service';

import type { DmProfileDetails } from '../../types/DmProfile';
import type { FetchDmProfileParams } from '../../services/file-service';


interface DmProfileDetailsModalProps {
  open: boolean;
  docNumber: string;
  docLibrary: string;
  onClose: () => void;
}

const fetchDmProfileDetails = async (profileDetailsParams: FetchDmProfileParams): Promise<DmProfileDetails> => await fileService.fetchDmProfileDetails(profileDetailsParams);

export const DmProfileDetailsModal: React.FC<DmProfileDetailsModalProps> = ({ open, docNumber, docLibrary, onClose }) => {
  const enabled = open && docNumber !== null && docLibrary !== null;
  const { user} = useUser();


const { userDST, userLibrary } = user!;
const profileDetailsParams: FetchDmProfileParams = { DocLibrary: docLibrary, DocNumber: docNumber, DST: userDST, PrimaryLibrary: userLibrary }
const {
  data: profileDetails,
  isLoading,
  isError,
  error,
} = useQuery<DmProfileDetails, Error>({
  queryKey: ['docNumber', docNumber],
  queryFn: () => fetchDmProfileDetails(profileDetailsParams),
  enabled, // only fetch if modal is open
  retry: false,
  staleTime: 1000 * 60, // 1 minute
});

return (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>User Details</DialogTitle>
    <DialogContent dividers>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">Failed to load user: {error.message}</Typography>
      ) : profileDetails ? (
        <>
          <Typography variant="h6">{profileDetails.DocName}</Typography>
          <Typography>Email: {profileDetails.Author.FullName}</Typography>
          <Typography>Role: {profileDetails?.CreatedBy?.FullName}</Typography>
        </>
      ) : (
        <Typography>No user data available.</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);
};

