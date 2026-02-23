import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import usePagination from "@/hooks/pagination/usePagination";
import type { User } from "@/types/common/user/user";
import type { Student } from "@/types/student/Student";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid2, Pagination, Stack, Typography } from "@mui/material";

interface StudentsCardsProps {
  students: User[];
  isLoading: boolean;
  isError: boolean;
  onOpen: (dni: Student["cedula"]) => void;
  itemsPerPage?: number;
}

const StudentsCards = ({ students, isLoading, isError, onOpen, itemsPerPage = 6 }: StudentsCardsProps) => {
  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(students, { itemsPerPage });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <EmptyState text="No se pudieron cargar los estudiantes" hideButton />;
  if (students.length === 0) return <EmptyState text="No hay estudiantes registrados" hideButton />;

  return (
    <Stack spacing={2.5}>
      <Grid2 container spacing={2}>
        {paginatedItems.map((student) => (
          <Grid2 key={student.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%", borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    {student.student?.name || "Estudiante"} {student.student?.lastName1 || ""}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Cedula: {student.dni}</Typography>
                  <Typography variant="body2" color="text.secondary">Email: {student.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Creado: {formatDateWithDaysAndHour(new Date(student.createdAt))}
                  </Typography>
                  <Chip
                    label={student.status ? "Activo" : "Inactivo"}
                    color={student.status ? "success" : "error"}
                    size="small"
                    variant="outlined"
                    sx={{ width: "fit-content" }}
                  />
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: "auto" }}>
                <Button variant="contained" size="small" onClick={() => onOpen(student.dni)}>
                  Ver estudiante
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Stack>
  );
};

export default StudentsCards;
