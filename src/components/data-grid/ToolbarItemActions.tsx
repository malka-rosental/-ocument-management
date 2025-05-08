import type { Document } from 'src/types/documents';

import { m } from 'framer-motion';

import { Box, Button } from "@mui/material";

import { ButtonTextIcon } from 'src/common/components/ButtonTextIcon';
import { InfoIcon, EmailIcon, UnlockIcon, CopyClipboardIcon, EditPermissionIcon, RequestPermissionIcon } from "src/assets/icons/actions-icons";

import { useDmActions } from '../../common/hooks/useDmActions';
import { useModalContext } from '../dm-profile/contexts/ProfileModalContext';


interface ToolbarItemActionsProps {
    selectesdRow?: Document;
}

export const ToolbarItemActions = ({ selectesdRow }: ToolbarItemActionsProps) => {
    const { selectedRow } = useModalContext();
    const { handleRowAction } = useDmActions();

    return (
        <Box component={m.div} sx={{ display: 'flex', columnGap: 2, direction: 'rtl' }}>
            <ButtonTextIcon
                disabled={!selectedRow}
                startIcon={<InfoIcon />}
                size="small"
                onClick={() => handleRowAction('profileInfo', selectedRow)}
            >
                <p>פרופיל מסמך</p>
            </ButtonTextIcon>
            <ButtonTextIcon
                disabled={!selectedRow}
                size="small"
                startIcon={<EditPermissionIcon />}
                onClick={() => handleRowAction('editPermission')}

            >
                <p>עריכת הרשאות</p>
            </ButtonTextIcon><ButtonTextIcon
                disabled={!selectedRow}
                size="small"
                startIcon={<EmailIcon />}
                onClick={() => handleRowAction('sendEmail')}
            >
                <p>שליחת מייל </p>
            </ButtonTextIcon>
            <ButtonTextIcon
                size='small'
                disabled={!selectedRow}
                startIcon={<CopyClipboardIcon />}
                onClick={() => handleRowAction('copyUrl', selectedRow)}
            ><p>העתק קישור</p>
            </ButtonTextIcon>
            <ButtonTextIcon
                disabled={!selectedRow}
                size="small"
                startIcon={<UnlockIcon />}
                onClick={() => handleRowAction('unlock')}
            >
                <p>שחרור מסמך  </p>
            </ButtonTextIcon>
            <ButtonTextIcon
                disabled={!selectedRow}
                size="small"
                startIcon={<RequestPermissionIcon />}
                onClick={() => handleRowAction('requestPermission')}
            >
                <p>בקשת הרשאות </p>
            </ButtonTextIcon>
        </Box >

    )
}

