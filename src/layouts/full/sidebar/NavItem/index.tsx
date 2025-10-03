import { NavLink, useLocation } from 'react-router-dom';
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme
} from '@mui/material';
import useIsMobile from '@hooks/isMobile/useIsMobile';
import type { Item } from '../MenuItems';

interface NavItemProps {
  item: Item;
  level?: number;
  pathDirect: string;
  closeDrawer: () => void;
}

const NavItem = ({ item, level, pathDirect, closeDrawer }: NavItemProps) => {
  const isMobile = useIsMobile()
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  const currentRoute = useLocation().pathname
  const isCurrentRoute = currentRoute.includes(item.href as string)
  const ListItemStyled = styled(ListItem)(() => ({
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
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        component={NavLink}
        to={item.href}
        href={item.external ? item.href : ''}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={isMobile ? closeDrawer : () => { }}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          <>{item.title}</>
        </ListItemText>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
