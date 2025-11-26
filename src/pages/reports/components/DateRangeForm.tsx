import CustomButton from "@/components/Buttons/CustomButton";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarMonth } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import { IconGraph } from "@tabler/icons-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";

// validation schema
const reportSchema = z.object({
  startDate: z.string().min(1, 'Fecha inicial requerida'),
  endDate: z.string().min(1, 'Fecha final requerida'),
}).refine((data) => {
  return new Date(data?.startDate) <= new Date(data?.endDate);
}, {
  message: 'La fecha inicial debe ser menor o igual a la fecha final',
  path: ['endDate'],
});

export type reportDateRangeSchemaType = z.infer<typeof reportSchema>

// Helper function para formatear fecha a YYYY-MM-DD
const formatDateToInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// dates form
const DateRangeForm = ({ onSubmit, loading }: { onSubmit: SubmitHandler<reportDateRangeSchemaType>, loading: boolean }) => {
  const theme = useTheme()
  const today = formatDateToInput(new Date());

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      startDate: today,
      endDate: today,
    }
  });

  return (
    <Card>
      <CardContent>
        <Box>
          <Stack spacing={1} alignItems={{ xs: "flex-start", md: "start" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: 2,
                  p: 1.5,
                  display: "flex",
                  boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <CalendarMonth sx={{ fontSize: 32, color: "primary.contrastText" }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={800} color="primary.main" letterSpacing={-0.5}>
                  Reporte por fechas
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Selecciona la fecha inicial y la fecha de cierre del reporte
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{my:2}}/>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={{ xs: 12, md: 4 }}>
              <CustomTextField
                externalLabel
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                type="date"
                name="startDate"
                register={register}
                label="Fecha Inicial"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <CustomTextField
                externalLabel
                error={!!errors.endDate}
                errorMessage={errors.endDate?.message}
                type="date"
                name="endDate"
                register={register}
                label="Fecha Final"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <CustomButton
                sx={{ mb: 2 }}
                icon={<IconGraph/>}
                type="submit"
                label="Generar Reporte"
                loading={loading}
              />
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DateRangeForm