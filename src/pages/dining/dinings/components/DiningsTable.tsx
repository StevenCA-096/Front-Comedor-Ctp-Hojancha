import { Alert, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { formatDateStringWithDays } from "@utils/date/format-date";
import { IconEye, IconLockCancel, IconLockOpen, IconUserCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { Add, Payment } from "@mui/icons-material";
import { useState } from "react";
import type { Dining } from "@/types/dining/dining/entities/dining";
import { useDiningList } from "@/hooks/api/dining/queries/useDiningList";
import type { MRT_ColumnDef } from "material-react-table";
import { MaterialReactTable } from "material-react-table";
import useCustomMaterialTable from "@/utils/mui-datatable/materialTableConfig";
import OpenDiningModal from "@/components/Modals/Dining/OpenDiningModal";
import CustomChip from "@/components/Chip/CustomChip";
import TableButton from "@/components/Buttons/TableButton";
import useUpdateDiningMutation from "@/hooks/api/dining/mutations/updateDiningMutation";
import toast from "react-hot-toast";
import { queryClient } from "@/config/queryClient";

const DiningsTable = () => {
    const theme = useTheme()

    // Loads all the dinings
    const {
        data: dinings = [],
        isLoading: diningsLoading,
        error: diningsError,
        isFetching,
        refetch,

    } = useDiningList();
    const navigate = useNavigate();

    const updateMutation = useUpdateDiningMutation({
        onSuccess: (updated) => {
            toast.success(`Caja ${updated?.closeDate ? 'ABIERTA' : 'CERRADA'} exitosamente`);
            //Updates in query cache instead of refetch for instant updatre
            queryClient.setQueryData<Dining[]>(['dinings'], (old) => {
                if (!old) return [updated];
                console.log(updated)
                return old.map(dining =>
                    dining.id === updated.id ? updated : dining
                );
            });
        },
    });

    //Shared funtion for close/open dining
    const handleUpdate = async (id: Dining['id'], open: boolean, prevDate: string | Date | null) => {
        //Avoids extra fetch in case of trying to close/open when its already in the respective state
        if (!prevDate && open) {
            return toast.success("La caja ya esta abierta.")
        }
        if (prevDate && !open) {
            return toast.success("La caja ya esta cerrada.")
        }
        
        updateMutation.mutateAsync({
            id,
            isOpen: open
        })
    }

    const [openModal, setOpenModal] = useState<boolean>(false)

    // Define columns for Material React Table
    const columns: MRT_ColumnDef<Dining>[] = [
        {
            accessorKey: 'openingDate',
            header: 'Fecha',
            size: 170,
            Cell: ({ cell }) => cell.getValue() ? formatDateStringWithDays(cell.getValue() as string) : 'No disponible',
        },
        {
            accessorKey: 'closeDate',
            header: 'Status',
            size: 100,
            Cell: ({ cell }) => (
                <CustomChip
                    label={cell.getValue() ? 'Cerrada' : 'Abierta'}
                    color={cell.getValue() ? 'error' : 'success'}
                />
            ),
        },
        {
            accessorKey: 'mealTime',
            header: 'Hora',
            size: 100,
            Cell: ({ cell }) => (
                <CustomChip
                    label={cell.getValue<string>()}
                    color={cell.getValue() === 'Almuerzo' ? 'primary' : 'warning'}
                />
            ),
        },
        {
            accessorKey: 'price',
            header: 'Precio',
            size: 100,
            Cell: ({ cell }) => `₡${cell.getValue<number>()}`,
        },
    ];

    // Custom hook using the material table configuration
    const table = useCustomMaterialTable<Dining>({
        columns,
        data: dinings,
        isLoading: diningsLoading,
        isLoadingError: !!diningsError,
        isFetching,
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <div style={{ display: 'flex', gap: '8px', flexDirection: "row" }}>
                <TableButton
                    Icon={<IconEye size={16} />}
                    onClick={() => navigate(`dining-details/${row.original.id}`)}
                    label="Ver"
                />
                <TableButton
                    Icon={<Payment fontSize="small" />}
                    onClick={() => navigate(`/register-dining-payment/diningId/${row.original.id}`)}
                    label="Pagar"
                />
                <TableButton
                    Icon={<IconUserCheck size={16} />}
                    label="Asistencia"
                    onClick={() => navigate(`/register-dining-assistance/diningId/${row.original.id}`)}
                />
                <TableButton
                    Icon={<IconLockOpen size={16} />}
                    label="Abrir caja"
                    onClick={() => handleUpdate(row.original.id, true, row.original.closeDate)}
                />
                <TableButton
                    Icon={<IconLockCancel size={16} />}
                    label="Cerrar caja"
                    onClick={() => handleUpdate(row.original.id, false, row.original.closeDate)}
                />
            </div>
        ),
        renderTopToolbarCustomActions: () => (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Box>
                    <Tooltip title={'Crear caja'}>
                        <IconButton
                            onClick={() => setOpenModal(true)}
                            sx={{
                                background: theme.palette.primary.main,
                                '&:hover': { background: theme.palette.primary.light }
                            }}
                        >
                            <Add sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </div>
        ),
    });


    if (diningsError) {
        return <Alert severity="error">Error al cargar los datos de las cajas</Alert>;
    }

    return <>
        <MaterialReactTable table={table} />
        <OpenDiningModal open={openModal} onClose={() => setOpenModal(false)} refetch={refetch} />
    </>;
};

export default DiningsTable;