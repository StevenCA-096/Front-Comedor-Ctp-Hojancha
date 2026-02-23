import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import usePagination from "@/hooks/pagination/usePagination";
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ScholarshipRequestsCardsProps {
  requests: ScholarshipRequest[];
  isLoading: boolean;
  isError: boolean;
  itemsPerPage?: number;
}

const ScholarshipRequestsCards = ({
  requests,
  isLoading,
  isError,
  itemsPerPage = 6,
}: ScholarshipRequestsCardsProps) => {
  const navigate = useNavigate();
  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(
    requests,
    { itemsPerPage },
  );

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <EmptyState
        text="No se pudieron cargar las solicitudes de beca"
        hideButton
      />
    );
  if (requests.length === 0)
    return <EmptyState text="No hay solicitudes de beca registradas" hideButton />;

  return (
    <Stack spacing={2.5}>
      <Grid2 container spacing={2}>
        {paginatedItems.map((request) => (
          <Grid2 key={request.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    {request.student?.name || "Estudiante"}{" "}
                    {request.student?.lastName1 || ""}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cedula: {request.student?.cedula || "-"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Beca: {request.scholarship?.name || "Sin resolucion"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estado: {request.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Solicitud: {formatDateWithDaysAndHour(new Date(request.requestDate))}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: "auto" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`details/${request.id}`)}
                >
                  Ver detalle
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

export default ScholarshipRequestsCards;
