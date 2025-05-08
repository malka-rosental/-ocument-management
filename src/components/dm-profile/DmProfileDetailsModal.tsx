import { useState } from 'react';

import { useConfig } from 'src/contexts/ConfigContext';

import { DmProfileDialog } from './DmProfileDialog';
import { useUser } from '../../contexts/UserContext';
import { useDmProfileQuery } from './hooks/useDmProfileQuery';
import { useModalContext } from './contexts/ProfileModalContext';


export const DmProfileDetailsModal = () => {
  const { getDmProfileApi } = useConfig();
  const { isModalOpen, selectedRow, closeModal } = useModalContext();
  const { user } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const { Docnumber: docNumber, Library: docLibrary } = selectedRow;
  const enabled = isModalOpen && !!docNumber && !!docLibrary;
  const profileDetailsParams = {
    DST: user?.userDST || '',
    PrimaryLibrary: user?.userLibrary || '',
    DocNumber: docNumber,
    DocLibrary: docLibrary,
  };

  const { data, isLoading, isError, error } = useDmProfileQuery(enabled, profileDetailsParams, getDmProfileApi);

  return (
    <DmProfileDialog
      open={isModalOpen}
      loading={isLoading}
      error={isError ? error.message : undefined}
      data={data}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      onClose={closeModal} 
      docNumber={docNumber} />
  );
};
