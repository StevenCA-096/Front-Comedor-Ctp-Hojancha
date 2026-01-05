import PageContainer from '@/components/container/page/PageContainer';
import { Avatar, Chip, Typography, Box, Grid2, alpha, useTheme, Divider, Alert, Button } from '@mui/material';
import { 
  IconMail, 
  IconPhone, 
  IconBriefcase, 
  IconShieldCheck,
  IconEdit,
} from '@tabler/icons-react';
import BlankCard from '@components/shared/BlankCard';
import { Phone, Work } from '@mui/icons-material';
import { useUser } from '@/hooks/auth/useAuth';
import useModal from '@/hooks/useModal/useModal';
import InfoItem from '@/components/shared/InfoItem';
import UpdateProfileModal from './UpdateProfileModal';

const UserProfile = () => {
  const theme = useTheme();
  const { open, handleClose, openModal } = useModal();
  const user = useUser();

  if (!user) {
    return (
      <PageContainer title='No hay usuario'>
        <Alert>Inicie sesión.</Alert>
      </PageContainer>
    );
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
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Botón de Editar en la esquina superior derecha */}
              <Button
                variant="contained"
                startIcon={<IconEdit size={18} />}
                onClick={openModal}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s'
                }}
              >
                Editar Perfil
              </Button>

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
              <Typography variant="h4" fontWeight={'bold'} gutterBottom>
                {user?.dni}
              </Typography>
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
          </BlankCard>
        </Grid2>

        {/* Información de Contacto */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <BlankCard>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.08)} 0%, ${alpha(theme.palette.success.main, 0.02)} 100%)`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                p: 2.5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Phone sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight={600}>
                Información de Contacto
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
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
                value={user?.admin?.phoneNumber?.toString()}
                color={'success'}
              />
            </Box>
          </BlankCard>
        </Grid2>

        {/* Información Laboral */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <BlankCard>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.08)} 0%, ${alpha(theme.palette.warning.main, 0.02)} 100%)`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                p: 2.5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Work sx={{ mr: 1 }} />
              <Typography variant="h5" fontWeight={600}>
                Información Laboral
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
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
          </BlankCard>
        </Grid2>
      </Grid2>

      {/* Modal de Actualización */}
      <UpdateProfileModal
        open={open}
        onClose={handleClose}
      />
    </PageContainer>
  );
};

export default UserProfile;