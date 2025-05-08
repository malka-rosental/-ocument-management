import type { DmProfileDetails } from 'src/types/DmProfile';

import { Box, Grid, Tooltip, TextField } from '@mui/material';

interface DmProfilePreviewProps {
    dmProfile: DmProfileDetails;
}
interface ProfileFields {
    label: string, value?: string, tooltipValue?: string, size: number

};

export default function DmProfilePreview({ dmProfile }: DmProfilePreviewProps) {
    const { DocName, SecurityClassification, BusinessClassification, PersonClassification, Department, Project, Shetach, Author, Categories } = dmProfile;
    const dmProfileMetaData: ProfileFields[] = [
        { label: 'שם מסמך', value: DocName, size: 12 },
        { label: 'סיווג בטחוני', value: SecurityClassification?.Description, size: 6 },
        { label: 'סיווג עסקי', value: BusinessClassification?.Description, size: 6 },
        { label: 'סיווג אישי', value: PersonClassification?.Description, size: 6 },
        { label: 'מחבר', value: Author?.FullName, size: 6 },
        { label: 'יחידה', value: Department?.Description, tooltipValue: `${Department?.Description} - ${Department?.Code}`, size: 6 },
        { label: 'תבנית/ מנהלה מובילה', value: Shetach?.Description, tooltipValue: `${Shetach?.Description} - ${Shetach?.Code}`, size: 6 },
        { label: 'פרויקט', value: Project?.Description, tooltipValue: `${Project?.Description} - ${Project?.Code}`, size: 6 },
        { label: 'מודול/ קטגוריה', value: Categories, tooltipValue: Categories, size: 6 },
    ]
    return (
        <Box component="form" noValidate autoComplete="off" sx={{ p: 3 }}>
            <Grid container spacing={2} >
                {dmProfileMetaData.map((field, index) => (
                    <Grid size={field.size} key={index}>
                        {field.tooltipValue && field.tooltipValue !== ' - ' ? (
                            <Tooltip title={field.tooltipValue}>
                                <TextField
                                    dir='rtl'
                                    fullWidth
                                    label={field.label}
                                    value={field.value ?? ''}
                                    disabled
                                    sx={{
                                        input: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            width: '100%',
                                        }
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            <Box
                            //  sx={{direction: 'rtl'}}
                             >

                            <TextField
                                // dir='rtl'
                                fullWidth
                                label={field.label}
                                value={field.value ?? ''}
                                disabled
                                sx={{
                                    input: {
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                    }
                                }}
                            />
                            </Box>

                        )}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
