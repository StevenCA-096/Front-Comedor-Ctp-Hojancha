import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores/auth/authStore";
import { logoutFromApi } from "@/services/auth/authService";
import { ExitToApp } from "@mui/icons-material";
import { useState } from "react";

const LogoutModalAlert = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const logoutFromState = useAuthStore(state => state.logoutFromState)

  const handleLogout = () => {
    logoutFromApi()
    logoutFromState()
    navigate('/auth/login')
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={<ExitToApp />}
      >
        Cerrar sesión
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} >
        <DialogTitle sx={{ textAlign: "center" }}>Cerrar sesión</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ textAlign: "center", background: "transparent" }}>
            ¿Estás seguro de que deseas cerrar sesión?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} >
            Cancelar
          </Button>
          <Button onClick={handleLogout} variant="contained">
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutModalAlert;