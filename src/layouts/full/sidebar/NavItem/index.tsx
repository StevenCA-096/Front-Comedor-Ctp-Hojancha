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
          ...(!isCurrentRoute && ({
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
            },
          })),

          '&.Mui-selected': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            },
          },
        }}
      >
        {Icon && (
          <ListItemIcon
            sx={{
              minWidth: '36px',
              color: 'inherit',
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
