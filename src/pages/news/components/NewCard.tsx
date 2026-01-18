import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Divider,
  alpha,
} from "@mui/material";
import { Delete, Visibility, Edit, Save, Close } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BlankCard from "@/components/shared/BlankCard";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import useUpdateNew from "@/hooks/api/news/mutations/useUpdateNew";
import useGetTags from "@/hooks/api/news/queries/useGetTags";
import type { News } from "@/types/news/news.entity";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";

// Schema de validación con Zod
const updateNewsSchema = z.object({
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

type UpdateNewsFormData = z.infer<typeof updateNewsSchema>;

interface NewCardProps {
  item: News;
}

const NewCard = ({ item }: NewCardProps) => {
  const updateMutation = useUpdateNew(item.id);
  const { data: allTags } = useGetTags();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: zodResolver(updateNewsSchema),
    defaultValues: {
      title: item.title ?? "",
      description: item.description ?? "",
      tagIds: item.tags?.map((tag) => tag.id) ?? [],
    },
  });

  // Actualizar form cuando cambie el item
  useEffect(() => {
    reset({
      title: item.title ?? "",
      description: item.description ?? "",
      tagIds: item.tags?.map((tag) => tag.id) ?? [],
    });
  }, [item, reset]);

  const handleTagToggle = (tagId: number, currentTags: number[]) => {
    return currentTags.includes(tagId)
      ? currentTags.filter((t) => t !== tagId)
      : [...currentTags, tagId];
  };

  const onSubmit = (data: UpdateNewsFormData) => {
    const payload = {
      title: data.title,
      description: data.description,
      ...(data.tagIds && data.tagIds.length > 0 && { tagIds: data.tagIds }),
    };

    updateMutation.mutate(payload, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleCancel = () => {
    reset({
      title: item.title ?? "",
      description: item.description ?? "",
      tagIds: item.tags?.map((tag) => tag.id) ?? [],
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    updateMutation.mutate({ isActive: false });
  };

  return (
    <BlankCard>
      <Box p={2.5}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box flex={1}>
              {isEditing ? (
                <Box width="100%">
                  <CustomTextField
                    name="title"
                    label="Titulo"
                    register={register}
                    error={!!errors.title}
                    errorMessage={errors.title?.message}
                    inputProps={{
                      style: { fontWeight: 600, fontSize: 18 },
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Box>
              ) : (
                <>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={0.5}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {item.title}
                    </Typography>

                    {!item.isActive && (
                      <Chip
                        label="Inactiva"
                        size="small"
                        color="default"
                        sx={{ height: 20, fontSize: "0.75rem" }}
                      />
                    )}
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateWithDaysAndHour(new Date(item.createdAt))}
                  </Typography>
                </>
              )}
            </Box>

            <Stack direction="row" spacing={0.5}>
              {isEditing ? (
                <>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={handleSubmit(onSubmit)}
                    disabled={updateMutation.isPending}
                  >
                    <Save />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleCancel}
                    disabled={updateMutation.isPending}
                  >
                    <Close />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton size="small" onClick={() => setIsEditing(true)}>
                    <Edit />
                  </IconButton>

                  {item.isActive ? (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleDelete}
                      disabled={updateMutation.isPending}
                    >
                      <Delete />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => updateMutation.mutate({ isActive: true })}
                      disabled={updateMutation.isPending}
                    >
                      <Visibility />
                    </IconButton>
                  )}
                </>
              )}
            </Stack>
          </Stack>

          <Divider />

          {isEditing ? (
            <CustomTextField
              name="description"
              label="Descripción"
              register={register}
              error={!!errors.description}
              errorMessage={errors.description?.message}
            />
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ opacity: item.isActive ? 1 : 0.6, whiteSpace: "pre-wrap" }}
            >
              {item.description}
            </Typography>
          )}

          {/* Tags - Editable o solo lectura */}
          {isEditing ? (
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                mb={1}
                color="text.secondary"
              >
                Etiquetas (opcional)
              </Typography>
              <Controller
                name="tagIds"
                control={control}
                render={({ field }) => (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {allTags?.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        size="small"
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
                          fontSize: "0.75rem",
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
                        }}
                      />
                    ))}
                  </Stack>
                )}
              />
            </Box>
          ) : (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {item.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{
                    bgcolor: alpha(tag.color, 0.1),
                    color: tag.color,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </BlankCard>
  );
};

export default NewCard;
