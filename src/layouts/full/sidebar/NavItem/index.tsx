import { NavLink, useLocation } from 'react-router-dom';
// mui imports
import {
  ListItemIcon,
  List,
  ListItemText,
  useTheme,
  ListItemButton
} from '@mui/material';
import useIsMobile from '@hooks/isMobile/useIsMobile';
import type { Item } from '../MenuItems';

interface NavItemProps {
  item: Item;
  pathDirect: string;
  closeDrawer?: () => void;
}

const NavItem = ({ item, pathDirect, closeDrawer }: NavItemProps) => {
  const isMobile = useIsMobile()
  const Icon = item.icon;
  const theme = useTheme();
  const currentRoute = useLocation().pathname
  const isCurrentRoute = currentRoute.includes(item.href as string)
  
  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemButton
        component={NavLink}
        to={item.href || '/'}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={isMobile ? closeDrawer : () => { }}
        sx={{
          whiteSpace: 'nowrap',
          marginBottom: '2px',
          padding: '8px 10px',
          borderRadius: '8px',
          backgroundColor: isCurrentRoute ? theme.palette.primary.main : '',
          color:
            isCurrentRoute ? 'white' : theme.palette.text.secondary,
          paddingLeft: '10px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'scale(1)',
          
          ...(!isCurrentRoute && ({
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              transform: 'scale(1.02)',
            },
          })),
          
          '&:active': {
            transform: 'scale(0.98)',
            transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          
          '&.Mui-selected': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              transform: 'scale(1.02)',
            },
          },
        }}
      >
        {Icon && (
          <ListItemIcon
            sx={{
              minWidth: '36px',
              color: 'inherit',
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '.MuiListItemButton-root:hover &': {
                transform: 'translateX(2px)',
              },
              '.MuiListItemButton-root:active &': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Icon stroke={1.5} size="1.3rem" />
          </ListItemIcon>
        )}
        <ListItemText>
          <>{item.title}</>
        </ListItemText>
      </ListItemButton>
    </List>
  );
};

export default NavItem;