import CustomButton from "@/components/Buttons/CustomButton";
import CustomChip from "@/components/Chip/CustomChip";
import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import OpenDiningModal from "@/components/Modals/Dining/OpenDiningModal";
import { queryClient } from "@/config/queryClient";
import { useDiningList } from "@/hooks/api/dining/queries/useDiningList";
import useUpdateDiningMutation from "@/hooks/api/dining/mutations/updateDiningMutation";
import usePagination from "@/hooks/pagination/usePagination";
import useSearchAndSort from "@/hooks/filters/useSearchAndSort";
import type { Dining } from "@/types/dining/dining/entities/dining";
import { formatDateStringWithDays } from "@/utils/date/format-date";
import { Add, Payment } from "@mui/icons-material";
import { IconEye, IconLockCancel, IconLockOpen, IconUserCheck } from "@tabler/icons-react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ListFilters from "@/components/filters/ListFilters";
import useIsMobile from "@/hooks/isMobile/useIsMobile";

interface DiningsCardsProps {
  itemsPerPage?: number;
}

const DiningsCards = ({ itemsPerPage = 6 }: DiningsCardsProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [processingDiningId, setProcessingDiningId] = useState<Dining["id"] | null>(null);
  const {
    data: dinings = [],
    isLoading,
    isError,
    refetch,
  } = useDiningList();

  const updateMutation = useUpdateDiningMutation({
    onSuccess: (updated) => {
      toast.success(`Caja ${updated?.closeDate ? "CERRADA" : "ABIERTA"} exitosamente`);
      queryClient.setQueryData<Dining[]>(["dinings"], (old) => {
        if (!old) return [updated];
        return old.map((dining) => (dining.id === updated.id ? updated : dining));
      });
    },
  });

  const handleToggleDiningStatus = async (dining: Dining) => {
    const shouldOpen = !!dining.closeDate;
    setProcessingDiningId(dining.id);

    try {
      await updateMutation.mutateAsync({
        id: dining.id,
        isOpen: shouldOpen,
      });
    } finally {
      setProcessingDiningId(null);
    }
  };

  const sortOptions = useMemo(
    () => [
      { key: "openingDate", label: "Fecha", getValue: (item: Dining) => new Date(item.openingDate) },
      { key: "mealTime", label: "Hora", getValue: (item: Dining) => item.mealTime },
      { key: "status", label: "Estado", getValue: (item: Dining) => item.closeDate ? "Cerrada" : "Abierta" },
      { key: "price", label: "Precio", getValue: (item: Dining) => item.price },
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
    items: dinings,
    searchableText: (item) => JSON.stringify(item),
    sortOptions,
    defaultSortKey: "openingDate",
    defaultSortDirection: "desc",
  });

  const { page, totalPages, paginatedItems, handlePageChange } = usePagination(
    filteredSortedItems,
    { itemsPerPage },
  );

  if (isLoading) return <LoadingScreen />;
  if (isError) return <EmptyState text="Error al cargar las cajas" hideButton />;
  if (dinings.length === 0) return <EmptyState text="No hay cajas registradas" hideButton />;

  return (
    <Stack spacing={2.5}>
      {!!dinings.length && (
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

      <Box>
        <CustomButton onClickFn={() => setOpenModal(true)} label="Crear caja" icon={<Add />} />
      </Box>

      <Grid2 container spacing={2}>
        {paginatedItems.map((dining) => (
          <Grid2 key={dining.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    {dining.mealTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha: {formatDateStringWithDays(dining.openingDate as string)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ¢{dining.price}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <CustomChip
                      label={dining.closeDate ? "Cerrada" : "Abierta"}
                      color={dining.closeDate ? "error" : "success"}
                    />
                    <CustomChip
                      label={dining.mealTime}
                      color={dining.mealTime === "Almuerzo" ? "primary" : "warning"}
                    />
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: "auto", flexWrap: "wrap", gap: 1 }}>
                <CustomButton
                  onClickFn={() => navigate(`dining-details/${dining.id}`)}
                  label="Ver"
                  icon={<IconEye size={16} />}
                />
                <CustomButton
                  onClickFn={() => navigate(`/register-dining-payment/diningId/${dining.id}`)}
                  label="Pagar"
                  icon={<Payment fontSize="small" />}
                />
                <CustomButton
                  onClickFn={() => navigate(`/register-dining-assistance/diningId/${dining.id}`)}
                  label="Asistencia"
                  icon={<IconUserCheck size={16} />}
                />
                <CustomButton
                  onClickFn={() => handleToggleDiningStatus(dining)}
                  label={dining.closeDate ? "Abrir" : "Cerrar"}
                  icon={dining.closeDate ? <IconLockOpen size={16} /> : <IconLockCancel size={16} />}
                  loading={processingDiningId === dining.id}
                />
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

      <OpenDiningModal open={openModal} onClose={() => setOpenModal(false)} refetch={refetch} />
    </Stack>
  );
};

export default DiningsCards;
