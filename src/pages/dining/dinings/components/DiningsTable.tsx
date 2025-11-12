import { Alert, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { formatDateStringWithDays, formatDateWithDays } from "@utils/date/format-date";
import { IconEye, IconUserCheck } from "@tabler/icons-react";
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

const DiningsTable = () => {
    const theme = useTheme()
    console.log('rendered')
    // Loads all the dinings
    const { 
        data: dinings = [], 
        isLoading: diningsLoading, 
        error: diningsError, 
        isFetching, 
        refetch 
    } = useDiningList();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState<boolean>(false)
    console.log(dinings)
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
            size:100,
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
            <div style={{ display: 'flex', gap: '8px', flexDirection:"row" }}>
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
        <MaterialReactTable table={table}/>
        <OpenDiningModal open={openModal} onClose={() => setOpenModal(false)} refetch={refetch} />
    </>;
};

export default DiningsTable;