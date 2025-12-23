// src/pages/news/News.tsx
import { Grid2, Box } from '@mui/material';
import PageContainer from '@/components/container/page/PageContainer';
import CreateNewsForm from './components/CreateNewsForm';
import NewsList from './components/NewsList';

const News = () => {
    return (
        <PageContainer title="Gestión de Noticias">
            <Box>
                <Grid2 container spacing={3}>
                    {/* Formulario de creación */}
                    <Grid2 size={{ xs: 12, lg: 5 }}>
                        <CreateNewsForm />
                    </Grid2>

                    {/* Lista de noticias */}
                    <Grid2 size={{ xs: 12, lg: 7 }}>
                        <NewsList />
                    </Grid2>
                </Grid2>
            </Box>
        </PageContainer>
    );
};

export default News;