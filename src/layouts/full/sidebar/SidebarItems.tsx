// SidebarItems.jsx - Actualizado para trabajar con el sidebar personalizado
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

interface SidebarItemsProps {
  collapsed: boolean,
  closeDrawer: () =>  void
}

const SidebarItems = ({ collapsed = false, closeDrawer }: SidebarItemsProps) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  
  return (
    <Box sx={{ 
      px: collapsed ? 1 : 3,
      transition: 'padding 0.3s ease' 
    }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          // SubHeader
          if (item.subheader) {
            return (
              <NavGroup 
                item={item} 
                key={item.subheader} 
              />
            );
          } else {
            return (
              <NavItem 
                closeDrawer={closeDrawer}
                item={item} 
                key={item.id} 
                pathDirect={pathDirect}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;