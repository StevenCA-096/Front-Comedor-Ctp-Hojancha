import { createTheme } from "@mui/material";
import typography from "../light/Typography";
import { shadows } from "./shadows";

const basedarkTheme = createTheme({
  direction: 'ltr',
  palette: {
    mode: 'dark',
    primary: {
      main: '#399de0dc',
      light: '#6f81b96b',
      dark: '#4570EA',
    },
    secondary: {
      main: '#49BEFF',
      light: '#e28080ff',
      dark: '#0f576dff',
    },
    success: {
      main: '#48BB78',
      light: '#68d3913a',
      dark: '#38A169',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3698e7ff',
      light: '#cadff0ff',
      dark: '#3182CE',
      contrastText: '#ffffff',
    },
    error: {
      main: '#F56565',
      light: '#e2a0a0ff',
      dark: '#E53E3E',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ED8936',
      light: '#f5dbbbff',
      dark: '#DD6B20',
      contrastText: '#ffffff',
    },
    grey: {
      100: '#171923',
      200: '#1A202C',
      300: '#2D3748',
      400: '#4A5568',
      500: '#718096',
      600: '#A0AEC0',
    },
    text: {
      primary: '#F7FAFC',
      secondary: '#A0AEC0',
    },
    action: {
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      hoverOpacity: 0.08,
      hover: 'rgba(255, 255, 255, 0.06)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      default: '#0F1419',
      paper: '#0e1318ff',
    },
  },
  typography,
  shadows
});

export { basedarkTheme };
