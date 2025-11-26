// src/pages/news/components/CreateNewsForm.tsx
import {
    Box,
    TextField,
    Typography,
    Chip,
    Stack,
    alpha,
    useTheme,
    Button,
} from "@mui/material";
import { Newspaper, Send } from "@mui/icons-material";
import BlankCard from "@/components/shared/BlankCard";
import { useState } from "react";

type NewsTag = 'Matricula' | 'Comedor' | 'Becas' | 'Horarios' | 'Otros';

const availableTags: NewsTag[] = ['Matricula', 'Comedor', 'Becas', 'Horarios', 'Otros'];

const tagColors: Record<NewsTag, string> = {
    'Matricula': '#9c27b0',
    'Comedor': '#2196f3',
    'Becas': '#ff9800',
    'Horarios': '#4caf50',
    'Otros': '#757575'
};

const CreateNewsForm = () => {
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<NewsTag[]>([]);

    const handleTagToggle = (tag: NewsTag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleSubmit = () => {
        console.log({ title, description, selectedTags });
        // Aquí irá la lógica de envío
        setTitle('');
        setDescription('');
        setSelectedTags([]);
    };

    return (
        <BlankCard>
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    p: 3,
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Newspaper sx={{ fontSize: 32, color: theme.palette.primary.main }} />
                    <Box>
                        <Typography variant="h5" fontWeight={600}>
                            Crear Noticia
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Publica información importante para los estudiantes
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box p={3}>
                <Stack spacing={3}>
                    {/* Título */}
                    <Box>
                        <Typography 
                            variant="subtitle2" 
                            fontWeight={600} 
                            mb={1}
                            color="text.secondary"
                        >
                            Título de la noticia
                        </Typography>
                        <TextField
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Cambio de horario de almuerzo"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'background.paper',
                                }
                            }}
                        />
                    </Box>

                    {/* Descripción */}
                    <Box>
                        <Typography 
                            variant="subtitle2" 
                            fontWeight={600} 
                            mb={1}
                            color="text.secondary"
                        >
                            Descripción
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe la información que quieres comunicar..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'background.paper',
                                }
                            }}
                        />
                    </Box>

                    {/* Etiquetas */}
                    <Box>
                        <Typography 
                            variant="subtitle2" 
                            fontWeight={600} 
                            mb={1.5}
                            color="text.secondary"
                        >
                            Etiquetas
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {availableTags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onClick={() => handleTagToggle(tag)}
                                    sx={{
                                        bgcolor: selectedTags.includes(tag) 
                                            ? tagColors[tag]
                                            : alpha(tagColors[tag], 0.1),
                                        color: selectedTags.includes(tag) 
                                            ? 'white'
                                            : tagColors[tag],
                                        fontWeight: 600,
                                        border: `2px solid ${selectedTags.includes(tag) 
                                            ? tagColors[tag]
                                            : 'transparent'}`,
                                        '&:hover': {
                                            bgcolor: selectedTags.includes(tag) 
                                                ? tagColors[tag]
                                                : alpha(tagColors[tag], 0.2),
                                        },
                                        cursor: 'pointer',
                                        mb: 1
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    {/* Botón enviar */}
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Send />}
                        onClick={handleSubmit}
                        disabled={!title || !description || selectedTags.length === 0}
                        sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                        }}
                    >
                        Publicar Noticia
                    </Button>
                </Stack>
            </Box>
        </BlankCard>
    );
};

export default CreateNewsForm;