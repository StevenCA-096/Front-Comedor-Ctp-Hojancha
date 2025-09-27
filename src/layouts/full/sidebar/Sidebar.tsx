// MSidebar.jsx - Versión personalizada sin react-mui-sidebar
import { useMediaQuery, Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';
import Logo from '../shared/logo/Logo';
import type { Theme } from '@mui/system';

interface SidebarProps {
  isSidebarOpen: boolean,
  onSidebarClose: () => void
}

const Sidebar = ({
  isSidebarOpen,
  onSidebarClose,
}: SidebarProps) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px';
  const collapseWidth = '80px';

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  // Sidebar Content customized to avoid react-sidebar library
  interface SidebarContentProps {
    collapsed: boolean
  }
  
  const SidebarContent = ({ collapsed = false }: SidebarContentProps) => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: collapsed ? collapseWidth : sidebarWidth,
        transition: 'width 0.3s ease',
        backgroundColor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Logo */}
      <Logo />

      {/* Sidebar Items */}
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        ...scrollbarStyles
      }}>
        <SidebarItems collapsed={collapsed} closeDrawer={onSidebarClose} />
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: isSidebarOpen ? sidebarWidth : collapseWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
        }}
      >
        {/* Sidebar for desktop */}
        <Drawer
          anchor="left"
          open={true}
          variant="permanent"
          PaperProps={{
            sx: {
              width: isSidebarOpen ? sidebarWidth : collapseWidth,
              boxSizing: 'border-box',
              border: 'none',
              boxShadow: '0 0 20px rgba(0,0,0,0.08)',
              transition: 'width 0.3s ease',
              ...scrollbarStyles,
            },
          }}
        >
          <SidebarContent collapsed={!isSidebarOpen} />
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <SidebarContent collapsed={false} />
    </Drawer>
  );
};

export default Sidebar;