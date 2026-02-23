import { useState } from "react";
import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const SIDEBAR_WIDTH = 270;

const FullLayout = () => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // States separados
  const [isDesktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [isMediumScreenSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMediumScreen) {
      setMobileSidebarOpen(!isMediumScreenSidebarOpen);
    } else {
      setDesktopSidebarOpen(!isDesktopSidebarOpen);
    }
  };

  return (
    <Grid2 sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        isMediumScreen={isMediumScreen}
        desktopOpen={isDesktopSidebarOpen}
        mobileOpen={isMediumScreenSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <Grid2
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          // Solo ajusta margin en desktop cuando está abierto
          ml: !isMediumScreen  ? `${SIDEBAR_WIDTH}px` : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Header */}
        <Header toggleSidebar={handleToggleSidebar} />

        {/* Page Content */}
        <Grid2 sx={{ flexGrow: 1 }}>
          <Outlet />
        </Grid2>

        {/* Footer */}
        <Grid2
          component="footer"
          sx={{
            py: 3,
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          Sistema de comedor Colegio Técnico Profesional de Hojancha
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default FullLayout;
