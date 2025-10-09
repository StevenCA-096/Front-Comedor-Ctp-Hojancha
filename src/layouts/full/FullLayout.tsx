import { useState } from "react";
import { Box } from "@mui/material";
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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile}
        desktopOpen={isDesktopSidebarOpen}
        mobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <Box
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
        }}
      >
        {/* Header */}
        <Header toggleSidebar={handleToggleSidebar} />

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          Sistema de comedor Colegio Técnico Profesional de Hojancha
        </Box>
      </Box>
    </Box>
  );
};

export default FullLayout;
