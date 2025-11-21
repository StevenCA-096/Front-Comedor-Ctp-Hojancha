import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import useThemeStore from '@stores/theme/themeStore';
import { basedarkTheme } from './theme/dark/DarkTheme';
import { baselightTheme } from './theme/light/LightTheme';
import { queryClient } from './config/queryClient';
import useApexChartsDarkMode from './hooks/IsDarkMode/useApexChartsDarkMode';

function App() {
  const routing = useRoutes(Router);
  const { mode, getEffectiveTheme } = useThemeStore();

  //Handles theme mode
  const effectiveTheme = useMemo(() => {
    return getEffectiveTheme();
  }, [mode, getEffectiveTheme]);

  const theme = useMemo(
    () => (effectiveTheme === 'dark' ? basedarkTheme : baselightTheme),
    [effectiveTheme]
  );

  //Hook to keep apex charts mdoe sincronized
  useApexChartsDarkMode(effectiveTheme)

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-right' />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;