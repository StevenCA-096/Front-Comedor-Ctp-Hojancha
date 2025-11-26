// src/pages/news/components/NewsList.tsx
import {
    Box,
    Typography,
    Stack,
    Chip,
    IconButton,
    alpha,
    Divider,
} from "@mui/material";
import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import BlankCard from "@/components/shared/BlankCard";
import { useState } from "react";

type NewsTag = 'Matricula' | 'Comedor' | 'Becas' | 'Horarios' | 'Otros';

interface NewsItem {
    id: string;
    title: string;
    description: string;
    tags: NewsTag[];
    createdAt: string;
    isActive: boolean;
}

const tagColors: Record<NewsTag, string> = {
    'Matricula': '#9c27b0',
    'Comedor': '#2196f3',
    'Becas': '#ff9800',
    'Horarios': '#4caf50',
    'Otros': '#757575'
};

// Datos de ejemplo
const initialNews: NewsItem[] = [
    {
        id: '1',
        title: 'Cambio de horario de almuerzo',
        description: 'A partir del próximo lunes, el horario de almuerzo será de 12:00 PM a 1:30 PM. Por favor tomen nota de este cambio importante.',
        tags: ['Comedor', 'Horarios'],
        createdAt: 'hace 2 horas',
        isActive: true
    },
    {
        id: '2',
        title: 'Nuevas becas disponibles',
        description: 'Se han abierto nuevas solicitudes de becas para el próximo periodo. Las solicitudes estarán abiertas hasta el 15 de diciembre.',
        tags: ['Becas', 'Matricula'],
        createdAt: 'hace 1 día',
        isActive: true
    },
    {
        id: '3',
        title: 'Menú especial de fin de año',
        description: 'Esta semana tendremos un menú especial en celebración de las fiestas de fin de año.',
        tags: ['Comedor'],
        createdAt: 'hace 3 días',
        isActive: false
    }
];

const NewsList = () => {

    const [news, setNews] = useState<NewsItem[]>(initialNews);

    const handleToggleActive = (id: string) => {
        setNews(prev => prev.map(item => 
            item.id === id ? { ...item, isActive: !item.isActive } : item
        ));
    };

    const handleDelete = (id: string) => {
        setNews(prev => prev.filter(item => item.id !== id));
    };

    if (news.length === 0) {
        return (
            <BlankCard>
                <Box p={4} textAlign="center">
                    <Typography variant="h6" color="text.secondary">
                        No hay noticias publicadas
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        Crea tu primera noticia para los estudiantes
                    </Typography>
                </Box>
            </BlankCard>
        );
    }

    return (
        <Stack spacing={2}>
            {news.map(item => (
                <BlankCard key={item.id}>
                    <Box p={2.5}>
                        <Stack spacing={2}>
                            {/* Header con título y acciones */}
                            <Stack 
                                direction="row" 
                                justifyContent="space-between" 
                                alignItems="flex-start"
                            >
                                <Box flex={1}>
                                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                        <Typography variant="h6" fontWeight={600}>
                                            {item.title}
                                        </Typography>
                                        {!item.isActive && (
                                            <Chip 
                                                label="Inactiva" 
                                                size="small" 
                                                color="default"
                                                sx={{ height: 20, fontSize: '0.75rem' }}
                                            />
                                        )}
                                    </Stack>
                                    <Typography 
                                        variant="caption" 
                                        color="text.secondary"
                                    >
                                        {item.createdAt}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={0.5}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleToggleActive(item.id)}
                                        sx={{
                                            color: item.isActive ? 'success.main' : 'text.secondary'
                                        }}
                                    >
                                        {item.isActive ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            </Stack>

                            <Divider />

                            {/* Descripción */}
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    opacity: item.isActive ? 1 : 0.6,
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {item.description}
                            </Typography>

                            {/* Etiquetas */}
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {item.tags.map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            bgcolor: alpha(tagColors[tag], 0.1),
                                            color: tagColors[tag],
                                            fontWeight: 600,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Box>
                </BlankCard>
            ))}
        </Stack>
    );
};

export default NewsList;