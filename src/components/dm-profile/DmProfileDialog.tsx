import React, { useRef } from 'react';

import {
  Dialog, Button, Typography, DialogTitle,
  DialogContent, DialogActions, CircularProgress
} from '@mui/material';

import { SaveIcon } from 'src/assets/icons';

import {DmProfileEdit} from './DmProfileEdit';
import DmProfilePreview from './DmProfilePreview';
import { DialogTitleActions } from './DialogTitleActions';

import type { DmProfileEditHandle } from './DmProfileEdit';
import type { DmProfileDetails } from '../../types/DmProfile';

interface DmProfileDialogProps {
  open: boolean;
  loading: boolean;
  error?: string;
  data?: DmProfileDetails;
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  onClose: () => void;
}

export const DmProfileDialog: React.FC<DmProfileDialogProps> = ({
  open, loading, error, data,
  isEditMode, setIsEditMode, onClose
}) => {
  const editRef = useRef<DmProfileEditHandle>(null);

  const handleSave = () => {
    editRef.current?.submit();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" dir="rtl">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        פרופיל מסמך
        <DialogTitleActions isEditMode={isEditMode} setEditMode={setIsEditMode} />
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">שגיאה: {error}</Typography>
        ) : data ? (
          isEditMode ? (
            <DmProfileEdit ref={editRef} dmProfileDetails={data} />
          ) : (
            <DmProfilePreview dmProfile={data} />
          )
        ) : (
          <Typography>לא נמצאו נתונים</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {isEditMode && (
          <Button color="primary" variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            שמירה
          </Button>
        )}
        <Button onClick={onClose}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};
