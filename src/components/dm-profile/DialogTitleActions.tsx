import { Box, IconButton } from "@mui/material";

import { EditIcon, EditPermissionIcon } from "src/assets/icons/actions-icons";

interface DialogTitleActionsProps {
    isEditMode: boolean;
    setEditMode: (value: boolean) => void
}
export const DialogTitleActions = ({ isEditMode, setEditMode }: DialogTitleActionsProps) => (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <IconButton>
            <EditPermissionIcon />
        </IconButton>
        <IconButton onClick={() => setEditMode(!isEditMode)} disabled={isEditMode} size="small">
            <EditIcon  />
        </IconButton>
    </Box>
)