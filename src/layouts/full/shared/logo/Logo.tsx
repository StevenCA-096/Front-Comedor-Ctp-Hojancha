import logo from '@assets/images/logos/CTP/logo_ctp_hojancha-removebg-preview.png';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Logo = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        borderBottom: '1px solid',
        borderColor: 'divider',
        minHeight: '64px',
        transition: 'all 0.3s ease',
        ml: 3
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '30%',
          transition: 'all 0.3s ease',
          marginRight: 10
        }}
      />
      <Box>
        <Typography color={'primary'} fontSize={20}>
          Sistema
        </Typography>
        <Typography color={'primary'} fontSize={20} fontWeight={'bold'}>
          Comedor
        </Typography>
      </Box>
    </Box >
  )

}

export default Logo