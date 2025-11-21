import CustomButton from "@/components/Buttons/CustomButton";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
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

// dates form
const DateRangeForm = ({ onSubmit, loading }: { onSubmit: SubmitHandler<reportDateRangeSchemaType>, loading: boolean }) => {
  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      startDate: '2025-11-05',
      endDate: '2025-11-06',
    }
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
          Seleccionar Período
        </Typography>
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