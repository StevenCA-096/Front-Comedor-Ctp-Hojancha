import { Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';
import Logo from '../shared/logo/Logo';

const SIDEBAR_WIDTH = 270;

interface SidebarProps {
  isMobile: boolean;
  desktopOpen: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar = ({
  isMobile,
  desktopOpen,
  mobileOpen,
  onMobileClose
}: SidebarProps) => {
  // Contenido compartido del sidebar
  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <Logo />

      {/* Menu Items */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
          },
        }}
      >
        <SidebarItems closeDrawer={onItemClick} />
      </Box>
    </Box>
  );

  // MOBILE: Drawer temporal
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Mejor performance
        }}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
            boxShadow: 3,
          },
        }}
      >
        <SidebarContent onItemClick={onMobileClose} />
      </Drawer>
    );
  }

  // DESKTOP: Drawer permanente
  return (
    <Drawer
      variant="permanent"
      open={desktopOpen}
      PaperProps={{
        sx: {
          width: SIDEBAR_WIDTH,
          borderRight: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
          // Ocultar/mostrar con transform
          transform: desktopOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: 'transform 0.3s ease',
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;