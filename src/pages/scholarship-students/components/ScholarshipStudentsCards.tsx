import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import usePagination from "@/hooks/pagination/usePagination";
import useActiveScholarshipStudentsByYear from "@/hooks/api/scholarship-request/queries/useActiveScholarshipStudentsByYear";
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import useSearchAndSort from "@/hooks/filters/useSearchAndSort";
import ListFilters from "@/components/filters/ListFilters";
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
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "@/hooks/isMobile/useIsMobile";

interface ScholarshipStudentsCardsProps {
  year: number;
  itemsPerPage?: number;
}

const ScholarshipStudentsCards = ({
  year,
  itemsPerPage = 6,
}: ScholarshipStudentsCardsProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    data: scholarshipRequests = [],
    isLoading,
    isError,
  } = useActiveScholarshipStudentsByYear(year);

  const sortOptions = useMemo(
    () => [
      { key: "student", label: "Estudiante", getValue: (item: ScholarshipRequest) => `${item.student?.name || ""} ${item.student?.lastName1 || ""}` },
      { key: "status", label: "Estado", getValue: (item: ScholarshipRequest) => item.status },
      { key: "resolutionDate", label: "Resolucion", getValue: (item: ScholarshipRequest) => item.resolutionDate ? new Date(item.resolutionDate) : new Date(0) },
      { key: "year", label: "Ciclo", getValue: (item: ScholarshipRequest) => item.year },
    ],
    [],
  );

  const {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filteredSortedItems,
  } = useSearchAndSort({
    items: scholarshipRequests,
    searchableText: (item) => JSON.stringify(item),
    sortOptions,
    defaultSortKey: "student",
  });

  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(
    filteredSortedItems,
    { itemsPerPage },
  );

  if (isLoading) return <LoadingScreen />;
  if (isError)
    return (
      <EmptyState
        text="No se pudieron cargar los estudiantes becados"
        hideButton
      />
    );
  if (scholarshipRequests.length === 0)
    return (
      <EmptyState
        text={`No hay estudiantes becados para el ciclo ${year}`}
        hideButton
      />
    );

  return (
    <Stack spacing={2.5}>
      {!!scholarshipRequests.length && (
        <ListFilters
          search={search}
          onSearchChange={setSearch}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          sortDirection={sortDirection}
          onSortDirectionChange={setSortDirection}
          sortOptions={sortOptions}
          defaultExpanded={!isMobile}
        />
      )}

      <Grid2 container spacing={2}>
        {paginatedItems.map((request: ScholarshipRequest) => (
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
                    Resolucion:{" "}
                    {request.resolutionDate
                      ? formatDateWithDaysAndHour(new Date(request.resolutionDate))
                      : "Sin resolucion"}
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

export default ScholarshipStudentsCards;
