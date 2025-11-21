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
                {user?.admin?.name?.slice(0,1)}
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
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.08)} 0%, ${alpha(theme.palette.success.main, 0.02)} 100%)`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                p: 2.5,
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
              }}
            >
              <Phone sx={{mr:1}}/>
              <Typography variant="h5" fontWeight={600}>
                 Información de Contacto
              </Typography>
            </Box>
            
            <Box sx={{ p: 3 }}>
              <InfoItem
                icon={<IconMail size={22} />}
                label="Email"
                value={user?.email}
                color={theme.palette.success.main}
              />
              
              <Divider sx={{ my: 2 }} />
              
              <InfoItem
                icon={<IconPhone size={22} />}
                label="Teléfono"
                value={user?.admin?.phoneNumber.toString()}
                color={theme.palette.success.main}
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
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
              }}
            >
              <Work sx={{mr:1}}/>
              <Typography variant="h5" fontWeight={600}>
                Información Laboral
              </Typography>
            </Box>
            
            <Box sx={{ p: 3 }}>
              <InfoItem
                icon={<IconBriefcase size={22} />}
                label="Puesto de Trabajo"
                value={user?.admin?.jobPosition}
                color={theme.palette.warning.main}
              />
              
              <Divider sx={{ my: 2 }} />
              
              <InfoItem
                icon={<IconShieldCheck size={22} />}
                label="Roles Asignados"
                value={user?.roles?.map(r => r.toUpperCase()).join(', ')}
                color={theme.palette.warning.main}
              />
            </Box>
          </BlankCard>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const InfoItem = ({ icon, label, value, color }: InfoItemProps) => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: alpha(color, 0.04),
        border: `1px solid ${alpha(color, 0.15)}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(color, 0.08),
          borderColor: alpha(color, 0.3),
          transform: 'translateX(4px)',
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: 2,
          bgcolor: alpha(color, 0.1),
          color: color,
          flexShrink: 0
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          fontWeight={600}
          display="block"
          textTransform="uppercase"
          letterSpacing={0.5}
          sx={{ mb: 0.5 }}
        >
          {label}
        </Typography>
        <Typography 
          variant="body1" 
          fontWeight={500}
          sx={{ 
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;