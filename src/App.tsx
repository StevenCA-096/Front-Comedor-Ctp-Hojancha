import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //avoid extre queries every time the user focuses the window
      gcTime: 5 * 60 * 1000, // 5 minutes
    }
  }
})

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

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

export default App