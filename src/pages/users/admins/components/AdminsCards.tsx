import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import usePagination from "@/hooks/pagination/usePagination";
import type { User } from "@/types/common/user/user";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import { Box, Button, Card, CardActions, CardContent, Chip, Grid2, Pagination, Stack, Typography } from "@mui/material";

interface AdminsCardsProps {
  admins: User[];
  isLoading: boolean;
  isError: boolean;
  onOpenModal: (admin: User) => void;
  itemsPerPage?: number;
}

const AdminsCards = ({ admins, isLoading, isError, onOpenModal, itemsPerPage = 6 }: AdminsCardsProps) => {
  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(admins, { itemsPerPage });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <EmptyState text="No se pudieron cargar los administradores" hideButton />;
  if (admins.length === 0) return <EmptyState text="No hay administradores registrados" hideButton />;

  return (
    <Stack spacing={2.5}>
      <Grid2 container spacing={2}>
        {paginatedItems.map((admin) => (
          <Grid2 key={admin.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%", borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    {admin.admin?.name} {admin.admin?.firstLastName} {admin.admin?.secondLastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Cedula: {admin.dni}</Typography>
                  <Typography variant="body2" color="text.secondary">Email: {admin.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Creado: {formatDateWithDaysAndHour(new Date(admin.createdAt))}
                  </Typography>
                  <Chip
                    label={admin.status ? "Activo" : "Inactivo"}
                    color={admin.status ? "success" : "error"}
                    size="small"
                    variant="outlined"
                    sx={{ width: "fit-content" }}
                  />
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: "auto" }}>
                <Button variant="contained" size="small" onClick={() => onOpenModal(admin)}>
                  Ver administrador
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

export default AdminsCards;
