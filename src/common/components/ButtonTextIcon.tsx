import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ButtonTextIcon = styled(Button)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    columnGap: 4,
    color: theme.palette.secondary.main
}));

