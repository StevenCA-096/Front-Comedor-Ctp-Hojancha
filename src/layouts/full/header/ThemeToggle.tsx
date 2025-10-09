// src/components/ThemeToggle.tsx
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import useThemeStore from '@/stores/theme/themeStore';
import {IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react';

function ThemeToggle() {
  const { mode, setMode } = useThemeStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (selectedMode: 'light' | 'dark' | 'system') => {
    setMode(selectedMode);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        {mode === 'dark' ? <IconMoon /> : 
         mode === 'light' ? <IconSun /> : 
         <IconSunMoon />}
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={() => handleSelect('light')}
          selected={mode === 'light'}
        >
          <ListItemIcon>
            <IconSun fontSize="small" />
          </ListItemIcon>
          <ListItemText>Claro</ListItemText>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleSelect('dark')}
          selected={mode === 'dark'}
        >
          <ListItemIcon>
            <IconMoon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Oscuro</ListItemText>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleSelect('system')}
          selected={mode === 'system'}
        >
          <ListItemIcon>
            <IconSunMoon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sistema</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ThemeToggle;