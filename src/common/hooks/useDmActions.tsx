import type { Document } from 'src/types/documents';

import { useState, useCallback } from 'react';

import { redirectUrl } from 'src/utils/redirect-new-tab';
import { buildDynamicLink } from 'src/utils/build-dynamic-link';

import { useUser } from 'src/contexts/UserContext';
import { useConfig } from 'src/contexts/ConfigContext';

import { useUnlockDmQuery } from './useUnlockDm';
import { useModalContext } from '../../components/dm-profile/contexts/ProfileModalContext';

export type RowActionType =
    | 'profileInfo'
    | 'editPermission'
    | 'sendEmail'
    | 'copyUrl'
    | 'unlock'
    | 'requestPermission';

export function useDmActions() {

    const { openModal, selectedRow } = useModalContext();
    const { user } = useUser();
    const { domainName, editPermissionLink, requestPermissionLink } = useConfig();
    const [row, setRow] = useState<Document | null>(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const { refetch } = useUnlockDmQuery(false, {
        docNum: row?.Docnumber ?? '',
        docName: row?.Docname ?? '',
        DocLib: row?.Library ?? ''
    }, `https://${domainName}`);

    const handleRowAction = useCallback(
        (action: RowActionType, payload?: any) => {
            setRow(payload ?? selectedRow);
            const currentRow = payload ?? selectedRow;
            switch (action) {
                case 'profileInfo':
                    openModal(payload ?? selectedRow);
                    break;

                case 'editPermission':
                    {
                        const editPermissionUrl = buildDynamicLink(editPermissionLink, { docnum: currentRow?.Docnumber ?? '', library: user?.userLibrary ?? '' })
                        redirectUrl(editPermissionUrl);
                        break;
                    }

                case 'sendEmail':
                    console.log('handleSendEmail');
                    break;

                case 'copyUrl': {
                    const fileUrl = getDmPreviewUrl(currentRow!);
                    handleCopy(fileUrl)
                    break;
                }

                case 'unlock':
                    refetch();
                    console.log('handleUnlockDocument');
                    break;

                case 'requestPermission': {

                    const editPermissionUrl = buildDynamicLink(requestPermissionLink,{docNumber: currentRow?.Docnumber?? '',docLib: user?.userLibrary ?? ''})
                    redirectUrl(editPermissionUrl);
                    console.log('handleRequestPermission');
                    break;
                }

                default:
                    console.warn('Unknown action:', action);
            }
        },
        [openModal]
    );

    const getDmPreviewUrl = (dmRow: Document): string => (`Pcdocs://${dmRow?.Library}/${dmRow?.Docnumber}/R`);

    return { handleRowAction, getDmPreviewUrl };
}