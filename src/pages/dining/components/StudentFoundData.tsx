import { Check, Close } from '@mui/icons-material';
import { 
    Avatar, 
    Chip, 
    Grid, 
    Typography,
    alpha,
    useTheme
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { IconIdBadge, IconPremiumRights, IconUser } from '@tabler/icons-react';
import BlankCard from '@components/shared/BlankCard';
import { useState, type ReactNode } from 'react';
import type StudentPaymentInfo from '@/types/dining/dining-student/dtos/studentPaymentInfo';
import { api } from '@/api/api';

interface StudentFoundDataProps {
    data: StudentPaymentInfo | null;
}

const StudentFoundData = ({ data }: StudentFoundDataProps) => {
    const theme = useTheme();
    
    if (!data) return null;

    const fullName = `${data.student?.name} ${data.student?.lastName1} ${data.student?.lastName2}`;
    const initials = `${data.student?.name?.[0] || ''}${data.student?.lastName1?.[0] || ''}`;
    const apiUrl = api.defaults.baseURL
    const [photoFormat, setPhotoFormat] = useState('jpeg')
    const photoFormats = ['jpeg', 'jpg', 'png']

    const handleImageError = () => {
        const currentIndex = photoFormats.indexOf(photoFormat)
        const nextIndex = currentIndex + 1

        if (nextIndex < photoFormats.length) {
            setPhotoFormat(photoFormats[nextIndex])
        }
    }

    return (
        <BlankCard>
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    p: 3,
                    pb: 2
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        sx={{
                            width: 130,
                            height: 130,
                            bgcolor: theme.palette.primary.main,
                            fontSize: '2rem',
                            fontWeight: 600,
                            boxShadow: theme.shadows[3]
                        }}
                        onError={handleImageError}
                        src={`${apiUrl}Files/Student_Files/${data.student.cedula}/${data.student.cedula}-Foto_Tamaño_Pasaporte.${photoFormat}`} // Cuando tengas la URL de la imagen
                    >
                        {initials}
                    </Avatar>
                    <Box flex={1}>
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            {fullName}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" color="text.secondary">
                                Cédula: {data.student?.cedula}
                            </Typography>
                            {data.scholarshipActive && (
                                <Chip
                                    icon={<Check sx={{ fontSize: 16 }} />}
                                    label={`Beca ${data.coverage}%`}
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            <Box p={3}>
                <Typography 
                    variant="overline" 
                    color="text.secondary" 
                    fontWeight={600}
                    letterSpacing={1}
                    mb={2}
                    display="block"
                >
                    Información Detallada
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Detail
                            title="Identificación"
                            icon={<IconIdBadge size={22} />}
                            value={data.student?.cedula}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Detail
                            title="Nombre Completo"
                            icon={<IconUser size={22} />}
                            value={fullName}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Detail
                            title="Estado de Beca"
                            icon={<IconPremiumRights size={22} />}
                            value={
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Chip
                                        icon={data.scholarshipActive ? <Check /> : <Close />}
                                        label={data.scholarshipActive ? 'Activa' : 'Inactiva'}
                                        color={data.scholarshipActive ? 'success' : 'error'}
                                        variant="filled"
                                    />
                                    {data.scholarshipActive && (
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: 2,
                                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                                border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
                                            }}
                                        >
                                            <Typography 
                                                variant="h6" 
                                                fontWeight={700}
                                                color="success.main"
                                            >
                                                {data.coverage}% Cobertura
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </BlankCard>
    );
};

interface DetailProps {
    title: string;
    value: string | ReactNode;
    icon: ReactNode;
}

const Detail = ({ title, value, icon }: DetailProps) => {
    const theme = useTheme();
    
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    borderColor: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[2]
                }
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                <Box
                    sx={{
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {icon}
                </Box>
                <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing={0.5}
                >
                    {title}
                </Typography>
            </Stack>
            <Typography variant="body1" fontWeight={500}>
                {value}
            </Typography>
        </Box>
    );
};

export default StudentFoundData;