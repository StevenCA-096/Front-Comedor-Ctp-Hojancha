// src/pages/news/components/NewsList.tsx
import { useState } from "react";
import { Box, Stack, Pagination } from "@mui/material";
import NewCard from "./NewCard";
import useGetNews from "@/hooks/api/news/queries/useGetNews";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import EmptyState from "@/components/EmptyState/EmptyState";

const ITEMS_PER_PAGE = 3;

const NewsList = () => {
    const { data: news, isLoading } = useGetNews();
    const [currentPage, setCurrentPage] = useState(1);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!news || news.length === 0) {
        return <EmptyState text="No hay noticias creadas" />;
    }

    // Calcular paginación
    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentNews = news.slice(startIndex, endIndex);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        // Scroll suave al inicio de la lista
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                {currentNews.map((item) => (
                    <NewCard key={item.id} item={item} />
                ))}
            </Stack>

            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </Stack>
    );
};

export default NewsList;