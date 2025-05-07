import type { DmProfileDetails } from 'src/types/DmProfile';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';

import { Box, Grid, TextField } from '@mui/material';

const formSchema = z.object({
    DocName: z.string().min(1, 'Name is required'),
    AuthorName: z.string().min(1, 'AuthorName is required'),
    Project: z.string().min(1, 'Project is required'),
});

type FormData = z.infer<typeof formSchema>;



export interface DmProfileEditHandle {
    submit: () => void;
}

interface DmProfileEditProps {
    dmProfileDetails: DmProfileDetails
}

export const DmProfileEdit = forwardRef<DmProfileEditHandle, DmProfileEditProps>(({ dmProfileDetails }, ref) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            DocName: dmProfileDetails.DocName,
            AuthorName: dmProfileDetails.Author.FullName,
            Project: dmProfileDetails.Project.Description,
        },
    });

    const onSubmit = (data: FormData) => {
        console.log('Form Submitted:', data);
    };
    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(onSubmit)();
        },
    }));
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        {...register('DocName')}
                        error={!!errors.DocName}
                        helperText={errors.DocName?.message}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        {...register('AuthorName')}
                        error={!!errors.AuthorName}
                        helperText={errors.AuthorName?.message}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Project"
                        type=""
                        {...register('Project')}
                        error={!!errors.Project}
                        helperText={errors.Project?.message}
                    />
                </Grid>
            </Grid>
        </Box>
    );
});
