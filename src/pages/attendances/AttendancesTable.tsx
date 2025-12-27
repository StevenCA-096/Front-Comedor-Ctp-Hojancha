import CustomChip from "@/components/Chip/CustomChip";
import type { AttendanceReportDto } from "@/types/dining/dining/dtos/attendance-report,dto";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import useCustomMaterialTable from "@/utils/mui-datatable/materialTableConfig";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table"
import { useMemo } from "react";

const AttendancesTable = ({ data }: { data: AttendanceReportDto[] | null }) => {

    // Define columns for Material React Table
    const columns = useMemo<MRT_ColumnDef<AttendanceReportDto>[]>(
        () => [
            {
                accessorKey: 'cedula',
                header: 'Cédula',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'fullName',
                header: 'Estudiante',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'mealTimeType',
                header: 'Tiempo de Comida',
                Cell: ({ cell }) => (
                    <CustomChip
                        label={cell.getValue<string>()}
                        color={
                            cell.getValue() === 'Desayuno' ? 'warning' :
                            cell.getValue() === 'Almuerzo' ? 'success' :
                            cell.getValue() === 'Cena' ? 'info' :
                            'default'
                        }
                    />
                ),
            },
            {
                accessorKey: 'status',
                header: 'Estado',
                Cell: ({ cell }) => (
                    <CustomChip
                        label={cell.getValue<string>()}
                        color={
                            cell.getValue() === 'completado' ? 'success' :
                            cell.getValue() === 'pendiente' ? 'warning' :
                            'error'
                        }
                    />
                ),
            },
            {
                accessorKey: 'timein',
                header: 'Hora de Entrada',
                Cell: ({ cell }) => 
                    formatDateWithDaysAndHour(new Date(cell.getValue<string>()))
            },
            {
                accessorKey: 'paymentMethod',
                header: 'Método de Pago',
            },
            {
                accessorKey: 'amountPaid',
                header: 'Monto Pagado',
                Cell: ({ cell }) => `₡${cell.getValue<number>().toLocaleString('es-CR')}`,
            },
            {
                accessorKey: 'price',
                header: 'Precio',
                Cell: ({ cell }) => `₡${cell.getValue<number>().toLocaleString('es-CR')}`,
            },
            {
                accessorKey: 'openingDate',
                header: 'Fecha de Apertura',
                Cell: ({ cell }) => 
                    formatDateWithDaysAndHour(new Date(cell.getValue<string>()))
            },
            {
                accessorKey: 'closeDate',
                header: 'Fecha de Cierre',
                Cell: ({ cell }) => {
                    const value = cell.getValue<string | null>();
                    return value ? formatDateWithDaysAndHour(new Date(value)) : (
                        <CustomChip label="Abierto" color="info" size="small" />
                    );
                }
            },
        ],
        []
    );

    // Custom hook using the material table configuration
    const table = useCustomMaterialTable<AttendanceReportDto>({
        columns,
        data: data || [],
        isLoading: false,
        isLoadingError: false,
        isFetching: false,
        enableRowActions: false,
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default AttendancesTable