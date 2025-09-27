import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-right'/>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App