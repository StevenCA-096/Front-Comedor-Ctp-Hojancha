import { Box, Card, Divider, Grid, Typography } from "@mui/material"
import LogoMepInstitution from "@/components/Logo/LogoMepInstitution"
import AuthVectors from "../shared/AuthVectors"
import RecoverPasswordForm from "./components/RecoverPasswordForm"

const RecoverPassword = () => {
  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <AuthVectors />
      <Grid container justifyContent="center" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={11}
          sm={11}
          lg={12}
          xl={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card elevation={9} sx={{ p: 6, zIndex: 1, width: "100%" }}>
            <LogoMepInstitution sx={{ width: "100%" }} />
            <Typography color="primary" textAlign="start" fontSize={{ xs: 20, md: 25 }} my={4}>
              Sistema de comedor
            </Typography>
            <Typography color="primary" fontWeight="bold" fontSize={25} my={1}>
              Cambiar contraseña
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Define una nueva contraseña para tu cuenta.
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <RecoverPasswordForm />
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecoverPassword
