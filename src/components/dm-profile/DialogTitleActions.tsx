import { Box, IconButton } from "@mui/material";

import { useDmActions } from "src/common/hooks/useDmActions";
import { EditIcon, EditPermissionIcon } from "src/assets/icons/actions-icons";

import { DmProfileDetails } from "src/types/DmProfile";

interface DialogTitleActionsProps {
    isEditMode: boolean;
    setEditMode: (value: boolean) => void;
    docNumber?: string;
}
export const DialogTitleActions = ({ isEditMode, setEditMode, docNumber }: DialogTitleActionsProps) => {
    const { handleRowAction } = useDmActions();
    const handleEditPermission = () => {
        handleRowAction('editPermission', {Docnumber:docNumber })
    }
    return (<Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IconButton onClick={handleEditPermission}>
            <EditPermissionIcon />
        </IconButton>
        {/* <IconButton onClick={() => setEditMode(!isEditMode)} disabled={isEditMode} size="small">
            <EditIcon  />
        </IconButton> */}
    </Box>
    )
}