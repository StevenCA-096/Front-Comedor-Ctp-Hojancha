import PageContainer from '@/components/container/page/PageContainer';
import { Avatar, Chip, Typography, Box, Grid2, alpha, useTheme, Divider, Alert } from '@mui/material';
import {
  IconMail,
  IconPhone,
  IconBriefcase,
  IconShieldCheck,
  IconId
} from '@tabler/icons-react';
import BlankCard from '@components/shared/BlankCard';
import { Phone, Work } from '@mui/icons-material';
import { useUser } from '@/hooks/auth/useAuth';
import GradientCard from '@/components/shared/GradientCard';
import InfoItem from '@/components/shared/InfoItem';

const UserProfile = () => {
  const theme = useTheme();

  const user = useUser()

  if (!user) {
    return <PageContainer title='No hay usuario'><Alert>Inicie sesión.</Alert></PageContainer>
  }

  return (
    <PageContainer>
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <BlankCard>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                pt: 6,
                pb: 4,
                textAlign: 'center'
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: '3rem',
                  bgcolor: theme.palette.primary.main,
                  fontWeight: 600,
                  mx: 'auto',
                  mb: 2,
                  boxShadow: theme.shadows[6],
                  border: `4px solid ${theme.palette.background.paper}`
                }}
              >
                {user?.admin?.name?.slice(0, 1)}
              </Avatar>

              <Typography variant="h3" fontWeight={600} gutterBottom>
                {`${user?.admin?.name} ${user?.admin?.firstLastName} ${user?.admin?.secondLastName}`}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2, fontSize: '1.1rem' }}
              >
                {user?.admin?.jobPosition}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                {user?.roles?.map((role) => (
                  <Chip
                    key={role}
                    label={role.toUpperCase()}
                    color="primary"
                    icon={<IconShieldCheck size={18} />}
                    sx={{
                      fontWeight: 600,
                      px: 1,
                      height: 32
                    }}
                  />
                ))}
                <Chip
                  label={user?.status ? "ACTIVO" : "INACTIVO"}
                  color={user?.status ? "success" : "error"}
                  sx={{
                    fontWeight: 600,
                    px: 1,
                    height: 32
                  }}
                />
              </Box>
            </Box>

            {/* Info rápida - Cédula centrada */}
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.info.main, 0.08),
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <IconId size={22} color={theme.palette.info.main} />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    display="block"
                    textTransform="uppercase"
                    letterSpacing={0.5}
                  >
                    Cédula
                  </Typography>
                  <Typography variant="h6" fontWeight={600} color="info.main">
                    {user?.dni}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </BlankCard>
        </Grid2>

        {/* Información de Contacto */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <BlankCard>
            <GradientCard color='success' title='Información de Contacto' icon={<Phone />}>
              <Box>
                <InfoItem
                  icon={<IconMail size={22} />}
                  label="Email"
                  value={user?.email}
                  color={'success'}
                />

                <Divider sx={{ my: 2 }} />

                <InfoItem
                  icon={<IconPhone size={22} />}
                  label="Teléfono"
                  value={user?.admin?.phoneNumber.toString()}
                  color={'success'}
                />
              </Box>
            </GradientCard>
          </BlankCard>
        </Grid2>

        {/* Información Laboral */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <GradientCard color='warning' icon={<Work />} title='Información Laboral' >
            <Box >
              <InfoItem
                icon={<IconBriefcase size={22} />}
                label="Puesto de Trabajo"
                value={user?.admin?.jobPosition}
                color={'warning'}
              />

              <Divider sx={{ my: 2 }} />

              <InfoItem
                icon={<IconShieldCheck size={22} />}
                label="Roles Asignados"
                value={user?.roles?.map(r => r.toUpperCase()).join(', ')}
                color={'warning'}
              />
            </Box>
          </GradientCard>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default UserProfile;