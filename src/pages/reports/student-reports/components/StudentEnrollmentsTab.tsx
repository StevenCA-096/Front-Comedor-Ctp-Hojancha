import CustomChip from "@/components/Chip/CustomChip";
import {
  Card,
  CardContent,
  Grid2,
  Typography,
  Box,
  CircularProgress,
  Alert,
  useTheme,
  Divider,
} from "@mui/material";
import { IconCalendar, IconSchool, IconMoon, IconSun } from "@tabler/icons-react";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import useGetEnrollmentsByStudentCedula from "@/hooks/api/studentEnrollment/queries/useGetEnrollmentsByStudentCedula";
import type { Student } from "@/types/student/Student";

const StudentEnrollmentsTab = ({ cedula }: { cedula: Student['cedula'] }) => {
  const { data, isLoading, isLoadingError } = useGetEnrollmentsByStudentCedula(cedula);
  const theme = useTheme()
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (isLoadingError) {
    return (
      <Alert severity="error">
        Error al cargar el historial de matrículas
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Alert severity="info">
        Sin matrículas registradas
      </Alert>
    );
  }

  return (
    <Grid2 container spacing={3}>
      {data.map((enrollment) => {
        const { sectionArea, isRecursing, appointment } = enrollment;
        const section = sectionArea?.section;
        const enrollment_info = section?.enrollment;
        const areas = section?.sectionareas || [];

        return (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={enrollment.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  borderColor: 'primary.main',
                }
              }}
            >
              {/* Header destacado con gradiente */}
              <Box
                sx={{
                  p: 2.5,
                }}
              >
                <Box display="flex" flexDirection={{xs:'column', sm: 'row'}} justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      Ciclo Lectivo
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {enrollment_info?.year || '—'}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display={'flex'} flexDirection={'row'} gap={1}>
                    <CustomChip
                      color="warning"
                      icon={enrollment_info?.isNocturnal ? <IconMoon /> : <IconSun color={theme.palette.warning.dark} />}
                      label={enrollment_info?.isNocturnal ? 'Jornada Nocturna' : 'Jornada Diurna'}
                    />

                    <CustomChip color="primary" label={`Nivel ${enrollment_info?.grade || '—'}`} />
                  </Box>

                </Box>
              </Box>

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>

                {/* Información de sección */}
                <Box
                  mb={2}
                  sx={{
                    bgcolor: 'action.hover',
                    p: 1.5,
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        p: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconSchool size={16} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Sección:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {section?.name || '—'}
                    </Typography>
                  </Box>

                  {section?.isNocturnal && (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          bgcolor: 'info.main',
                          color: 'white',
                          borderRadius: '50%',
                          p: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconMoon size={16} />
                      </Box>
                      <Typography variant="body2" fontWeight="medium" color="info.main">
                        Modalidad Nocturna
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Talleres */}
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Talleres:
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    {areas.map((area) => (
                      <Typography key={area.id} variant="body2">
                        • <strong>{area.name}:</strong> {area.area?.name || '—'}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Fecha de cita */}
                {appointment?.date && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <IconCalendar size={18} />
                    <Typography variant="body2" color="text.secondary">
                      Cita:
                    </Typography>
                    <Typography variant="body2">
                      {formatDateWithDaysAndHour(new Date(appointment.date))}
                    </Typography>
                  </Box>
                )}

                {/* Repitencia */}
                {isRecursing && (
                  <Box mb={2}>
                    <CustomChip
                      label="Repitencia"
                      color="error"
                      size="small"
                    />
                  </Box>
                )}

                {/* Botón de acción */}
                {/* <Box mt="auto" pt={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<IconEye size={18} />}
                    onClick={() => navigate(`/history/details/${enrollment.id}`)}
                  >
                    Ver Detalles
                  </Button>
                </Box> */}
              </CardContent>
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default StudentEnrollmentsTab;