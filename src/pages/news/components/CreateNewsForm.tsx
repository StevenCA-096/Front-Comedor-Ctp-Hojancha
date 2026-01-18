import { Box, Typography, Chip, Stack, alpha, Button } from "@mui/material";
import { Newspaper, Send } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useGetTags from "@/hooks/api/news/queries/useGetTags";
import useCreateNew from "@/hooks/api/news/mutations/useCreateNew";
import GradientCard from "@/components/shared/GradientCard";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";

const createNewsSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(200, "El título no puede exceder 200 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(2000, "La descripción no puede exceder 2000 caracteres"),
  tagIds: z.array(z.number()).default([]),
});

type CreateNewsFormData = z.infer<typeof createNewsSchema>;

const CreateNewsForm = () => {
  const { data: tags } = useGetTags();
  const { mutate: createNews, isPending } = useCreateNew();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: "",
      description: "",
      tagIds: [],
    },
  });

  const handleTagToggle = (tagId: number, currentTags: number[]) => {
    return currentTags.includes(tagId)
      ? currentTags.filter((t) => t !== tagId)
      : [...currentTags, tagId];
  };

  const onSubmit = (data: CreateNewsFormData) => {
    const payload = {
      title: data.title,
      description: data.description,
      ...(data.tagIds && data.tagIds.length > 0 && { tagIds: data.tagIds }),
    };

    createNews(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <GradientCard icon={<Newspaper />} color="primary" title="Crear Noticia">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={0.2}>
          {/* Título */}
          <CustomTextField
            label="Título"
            name="title"
            error={!!errors.title}
            errorMessage={errors.title?.message}
            register={register}
            externalLabel
          />

          {/* Descripción */}
          <CustomTextField
            label="Descripción"
            name="description"
            error={!!errors.description}
            errorMessage={errors.description?.message}
            register={register}
            externalLabel
          />
          {/* Etiquetas */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              mb={1.5}
              color="text.secondary"
            >
              Etiquetas (opcional)
            </Typography>
            <Controller
              name="tagIds"
              control={control}
              render={({ field }) => (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {tags &&
                    tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        onClick={() =>
                          field.onChange(
                            handleTagToggle(tag.id, field.value || [])
                          )
                        }
                        sx={{
                          bgcolor: field.value?.includes(tag.id)
                            ? tag.color
                            : alpha(tag.color, 0.1),
                          color: field.value?.includes(tag.id)
                            ? "white"
                            : tag.color,
                          fontWeight: 600,
                          border: `2px solid ${
                            field.value?.includes(tag.id)
                              ? tag.color
                              : "transparent"
                          }`,
                          "&:hover": {
                            bgcolor: field.value?.includes(tag.id)
                              ? tag.color
                              : alpha(tag.color, 0.2),
                          },
                          cursor: "pointer",
                          mb: 1,
                        }}
                      />
                    ))}
                </Stack>
              )}
            />
          </Box>
        </Stack>
        {/* Botón enviar */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          startIcon={<Send />}
          disabled={isPending}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            mt: 2,
          }}
        >
          {isPending ? "Publicando..." : "Publicar Noticia"}
        </Button>
      </Box>
    </GradientCard>
  );
};

export default CreateNewsForm;
