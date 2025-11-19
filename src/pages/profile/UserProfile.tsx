import PageContainer from '@/components/container/page/PageContainer';
import { Avatar, Card, CardContent, Chip, Typography, Box, Grid2 } from '@mui/material';
import { 
  IconMail, 
  IconPhone, 
  IconBriefcase, 
  IconShieldCheck,
  IconId
} from '@tabler/icons-react';

const UserProfile = () => {
  // Datos del usuario de ejemplo
  const user = {
    roles: ["admin"],
    dni: "504420136",
    email: "scordero096@gmail.com",
    status: true,
    admin: {
      name: "STEVEN",
      firstLastName: "CORDERO",
      secondLastName: "ALVAREZ",
      phoneNumber: 86889718,
      jobPosition: "Administracion",
      status: true
    }
  };

  const getInitials = (name) => {
    return name?.charAt(0).toUpperCase() || 'U';
  };

  const getFullName = () => {
    const { name, firstLastName, secondLastName } = user.admin;
    return `${name} ${firstLastName} ${secondLastName}`;
  };

  return (
    <PageContainer>
      <Grid2 container spacing={3}>
        {/* Header con Avatar y Info Principal */}
        <Grid2 size={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: '2.5rem',
                    bgcolor: 'primary.main',
                    fontWeight: 600
                  }}
                >
                  {getInitials(user.admin.name)}
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {getFullName()}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {user.roles.map((role) => (
                      <Chip
                        key={role}
                        label={role.toUpperCase()}
                        color="primary"
                        icon={<IconShieldCheck size={16} />}
                        size="small"
                      />
                    ))}
                    <Chip
                      label={user.status ? "ACTIVO" : "INACTIVO"}
                      color={user.status ? "success" : "error"}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary">
                    {user.admin.jobPosition}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Información de Contacto */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Información de Contacto
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconMail size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconPhone size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Teléfono
                    </Typography>
                    <Typography variant="body1">
                      {user.admin.phoneNumber}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Información Personal */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Información Personal
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconId size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      DNI
                    </Typography>
                    <Typography variant="body1">
                      {user.dni}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconBriefcase size={20} color="#666" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Puesto
                    </Typography>
                    <Typography variant="body1">
                      {user.admin.jobPosition}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default UserProfile;