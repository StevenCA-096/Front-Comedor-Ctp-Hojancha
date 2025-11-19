import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, CardContent, Grid2, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
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

// dates form
const DateRangeForm = ({ onSubmit }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
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
        <Box component="div" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 size={{xs:12, md:4}}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha Inicial"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors?.startDate}
                    helperText={errors?.startDate?.message as string}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{xs:12, md:4}}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha Final"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors?.endDate}
                    helperText={errors?.endDate?.message as string}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{xs:12, md:4}}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                fullWidth
                size="large"
              >
                Generar Reporte
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DateRangeForm