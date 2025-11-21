import { useState } from 'react';
import {
  Avatar,
  Box,
  Menu,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { IconUser } from '@tabler/icons-react';
import LogoutModalAlert from '../../../components/Modals/Auth/LogoutModalAlert';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const [anchorEl2, setAnchorEl2] = useState<Element | null>(null);
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={(e) => handleClick2(e)}
      >
        <Avatar
        
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem onClick={() =>{navigate('/profile'); handleClose2()}}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <LogoutModalAlert />
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
