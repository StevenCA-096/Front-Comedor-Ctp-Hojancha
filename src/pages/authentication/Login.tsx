import { Grid, Box, Card, Typography, Divider } from '@mui/material';

// components
import AuthLogin from './auth/AuthLogin';
import PageMeta from '@components/container/page/PageMeta';
import Logo from '@assets/images/logos/CTP/Logo_ctp-mep.png'

const Login2 = () => {

  return (
    <>
      <PageMeta title="Login" description="this is Login page" />
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container justifyContent="center" sx={{ height: '100vh' }}>
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
              <Box
                component={'img'}
                src={Logo}
                sx={{
                  objectFit: "contain",
                  width: '100%'
                }}
              />
              <Typography color={'darkblue'} fontWeight={'bold'} fontSize={{ xs: 30, md: 35 }} my={4} >
                Bienvenido
              </Typography>
              <Typography color={'gray'} fontWeight={'bold'}  >
                Por favor, inicie sesión
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login2;
