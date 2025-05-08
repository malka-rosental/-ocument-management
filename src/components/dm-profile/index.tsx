import React, { useState } from 'react';

import { useConfig } from 'src/contexts/ConfigContext';

import { DmProfileDialog } from './DmProfileDialog';
import { useUser } from '../../contexts/UserContext';
import { useDmProfileQuery } from './hooks/useDmProfileQuery';

// import type { DmProfileDetailsModalProps } from './types'; // You can extract props type if needed
interface DmProfileDetailsModalProps {
    open: boolean;
    docNumber: string;
    docLibrary: string;
    onClose: () => void;
}
export const DmProfileDetailsModal: React.FC<DmProfileDetailsModalProps> = ({
    open,
    docNumber,
    docLibrary,
    onClose
}) => {
    const { user } = useUser();
    const { getDmProfileApi } = useConfig();
    const [isEditMode, setIsEditMode] = useState(false);

    const enabled = open && !!docNumber && !!docLibrary;
    const profileDetailsParams = {
        DST: user?.userDST || '',
        PrimaryLibrary: user?.userLibrary || '',
        DocNumber: docNumber,
        DocLibrary: docLibrary,
    };

    const { data, isLoading, isError, error } = useDmProfileQuery(enabled, profileDetailsParams, getDmProfileApi);

    return (
        <DmProfileDialog
            open={open}
            loading={isLoading}
            error={isError ? error.message : undefined}
            data={data}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            onClose={onClose}
            docNumber={docNumber}
        />
    );
};
