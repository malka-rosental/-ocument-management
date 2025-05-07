import type { Document } from 'src/types/documents';

import { m } from 'framer-motion';

import { Box, Button } from "@mui/material";

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
            <Button
                disabled={!selectedRow}
                startIcon={<InfoIcon />}
                size="small"
                onClick={() => handleRowAction('profileInfo', selectedRow)}
            >
                <p>פרופיל מסמך</p>
            </Button>
            <Button
                disabled={!selectedRow}
                size="small"
                startIcon={<EditPermissionIcon />}
                onClick={() => handleRowAction('editPermission')}

            >
                <p>עריכת הרשאות</p>
            </Button><Button
                disabled={!selectedRow}
                size="small"
                startIcon={<EmailIcon />}
                onClick={() => handleRowAction('sendEmail')}
            >
                <p>שליחת מייל </p>
            </Button>
            <Button
                size='small'
                disabled={!selectedRow}
                startIcon={<CopyClipboardIcon />}
                onClick={() => handleRowAction('copyUrl', selectedRow)}
            ><p>העתק קישור</p>
            </Button>
            <Button
                disabled={!selectedRow}
                size="small"
                startIcon={<UnlockIcon />}
                onClick={() => handleRowAction('unlock')}
            >
                <p>שחרור מסמך  </p>
            </Button>
            <Button
                disabled={!selectedRow}
                size="small"
                startIcon={<RequestPermissionIcon />}
                onClick={() => handleRowAction('requestPermission')}
            >
                <p>בקשת הרשאות </p>
            </Button>
        </Box>

    )
}

