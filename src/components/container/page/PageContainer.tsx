import { Container, Typography, Box, IconButton } from '@mui/material';
import PageMeta from './PageMeta';
import { ArrowBackIosNew } from '@mui/icons-material';
import type { ReactNode } from 'react';
  
interface PageContainerProps {
  title?: string;
  description?: string;
  children: ReactNode;
  showBackButton?: boolean
  action?: ReactNode
}

const PageContainer = ({ title, description = '', children, showBackButton = false,action }: PageContainerProps) => (
  <Container
    maxWidth="xl"
    sx={{
      mt: 4,
      mb: 4,
      p: { xs: 2, sm: 3, md: 4 },
    }}
  >
    <PageMeta title={title} description={description} />

    {/* Encabezado */}
    <Box mb={3} sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          gutterBottom
        >
          {
            showBackButton &&
            <IconButton onClick={() => history.back()}>
              <ArrowBackIosNew />
            </IconButton>
          }

          {title}
        </Typography>

        {description && (
          <Typography variant="subtitle1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
      <Box>
        {action}
      </Box>
    </Box>

    {/* Contenido */}
    <Box>
      {children}
    </Box>
  </Container>
);

export default PageContainer;
