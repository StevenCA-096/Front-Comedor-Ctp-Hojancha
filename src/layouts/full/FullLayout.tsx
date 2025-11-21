import { useState } from "react";
import { Grid2 } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import useIsMobile from "@/hooks/isMobile/useIsMobile";

const SIDEBAR_WIDTH = 270;

const FullLayout = () => {
  const isMobile = useIsMobile();
  
  // States separados
  const [isDesktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setDesktopSidebarOpen(!isDesktopSidebarOpen);
    }
  };

  return (
    <Grid2 sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile}
        desktopOpen={isDesktopSidebarOpen}
        mobileOpen={isMobileSidebarOpen}
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
          ml: !isMobile  ? `${SIDEBAR_WIDTH}px` : 0,
          transition: 'margin-left 0.3s ease',
          bgcolor:"paper"
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
