import CustomChip from "@/components/Chip/CustomChip";
import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import usePagination from "@/hooks/pagination/usePagination";
import type { AttendanceReportDto } from "@/types/dining/dining/dtos/attendance-report,dto";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

interface AttendancesCardsProps {
  data: AttendanceReportDto[];
  isLoading: boolean;
  isError: boolean;
  itemsPerPage?: number;
}

const getMealTimeColor = (mealTime: string) => {
  if (mealTime === "Desayuno") return "warning";
  if (mealTime === "Almuerzo") return "success";
  if (mealTime === "Cena") return "info";
  return "default";
};

const getStatusColor = (status: string) => {
  if (status === "completado") return "success";
  if (status === "pendiente") return "warning";
  return "error";
};

const AttendancesCards = ({
  data,
  isLoading,
  isError,
  itemsPerPage = 6,
}: AttendancesCardsProps) => {
  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(
    data,
    { itemsPerPage },
  );

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <EmptyState
        text="No se pudieron cargar las asistencias"
        hideButton
      />
    );
  if (data.length === 0)
    return <EmptyState text="No hay asistencias registradas" hideButton />;

  return (
    <Stack spacing={2.5}>
      <Grid2 container spacing={2}>
        {paginatedItems.map((attendance) => (
          <Grid2
            key={attendance.diningStudentId}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
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
                    {attendance.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cedula: {attendance.cedula}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Entrada:{" "}
                    {formatDateWithDaysAndHour(new Date(attendance.timein))}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pago: {attendance.paymentMethod} - ¢
                    {attendance.amountPaid.toLocaleString("es-CR")}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <CustomChip
                      label={attendance.mealTimeType}
                      color={getMealTimeColor(attendance.mealTimeType)}
                    />
                    <Chip
                      label={attendance.status}
                      color={getStatusColor(attendance.status)}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
              </CardContent>
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

export default AttendancesCards;
