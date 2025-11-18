import { Grid, Box, Card, Typography, Divider } from '@mui/material';

// components
import AuthLogin from './auth/AuthLogin';
import PageMeta from '@components/container/page/PageMeta';
import Logo from '@assets/images/logos/CTP/Logo_ctp-mep.png'
import LogoMepInstitution from '@/components/Logo/LogoMepInstitution';

const Login2 = () => {

  return (
    <>
      <PageMeta title="Login" description="this is Login page" />
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container justifyContent="center" sx={{ height: '100dvh' }}>
          <Grid
            item
            xs={11}
            sm={6}
            lg={6}
            xl={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: { xs: 5, md: 6 }, zIndex: 1, width: '100%' }}>
              <LogoMepInstitution
                sx={{
                  objectFit: "cover",
                  width: '100%',
                }}
              />
              <Typography color={'primary'} textAlign={'start'} fontSize={{ xs: 20, md: 25 }} my={4} >
                Sistema de comedor
              </Typography>
              <Typography color={'primary'} fontWeight={'bold'} textAlign={'start'} fontSize={{ xs: 30, md: 35 }} my={4} >
                Bienvenido
              </Typography>
              <Typography color={'gray'} fontWeight={'bold'}  >
                Por favor, inicie sesión
              </Typography>
              <Divider sx={{ my: 2 }} />

              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login2;
