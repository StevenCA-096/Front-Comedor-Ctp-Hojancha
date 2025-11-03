import TableButton from "@/components/Buttons/TableButton";
import CustomChip from "@/components/Chip/CustomChip";
import useScholarshipRequestsList from "@/hooks/api/scholarship-request/queries/useScholarshipRequestsList";
import type { ColorOptions } from "@/theme/ColorOptions";
import type { ScholarshipRequest, ScholarshipRequestStatus } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import useCustomMaterialTable from "@/utils/mui-datatable/materialTableConfig";
import { IconEye } from "@tabler/icons-react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status: ScholarshipRequestStatus) => {
    const map: Record<ScholarshipRequestStatus, ColorOptions> = {
        'Pendiente': 'warning',
        'Aprobado': 'success',
        'Rechazado': 'error'
    }
    return map[status]
}

const ScholarshipRequestsTable = () => {
    // Loads all the dinings
    const { data: scholarshipRequests = [], isLoading: scholarshipRequestsLoading, error: scholarshipRequestsError, isFetching } = useScholarshipRequestsList();
    const navigate = useNavigate();
    console.log(scholarshipRequests)

    // Define columns for Material React Table
    const columns: MRT_ColumnDef<ScholarshipRequest>[] = [
        {
            accessorKey: 'student.cedula',
            header: 'Cedula',
        },
        {
            accessorKey: 'student.name',
            header: 'Estudiante',
            Cell: ({ row }) => {
                const student = row?.original?.student;
                return `${student?.name} ${student?.lastName1}`;
            }
        },
        {
            accessorKey: 'scholarship.name',
            header: 'Beca solicitada',
            Cell: ({ cell }) => (
                <CustomChip
                    label={cell.getValue<string>() || 'Sin Resolución'}
                    color={cell.getValue() ? 'primary' : 'warning'}
                />
            ),
        },
        {
            accessorKey: 'requestDate',
            header: 'Fecha',
            Cell: ({ cell }) => formatDateWithDaysAndHour(new Date(cell.getValue<string>())),
        },
        {
            accessorKey: 'status',
            header: 'Estado',
            Cell: ({ cell }) => (
                <CustomChip
                    label={cell?.getValue<string>()}
                    color={getStatusColor(cell.getValue<ScholarshipRequestStatus>())}
                />
            ),
        },
        {
            accessorKey: 'resolutionDate',
            header: 'Fecha de resolución',
            Cell: ({ cell }) => (
                <CustomChip
                    label={formatDateWithDaysAndHour(new Date(cell.getValue<string>())) || 'Sin Resolución'}
                    color={cell.getValue() ? 'primary' : 'warning'}
                />
            ),
        },
        {
            accessorKey: 'year',
            header: 'Año',
        },
    ];

    // Custom hook using the material table configuration
    const table = useCustomMaterialTable<ScholarshipRequest>({
        columns,
        data: scholarshipRequests,
        isLoading: scholarshipRequestsLoading,
        isLoadingError: !!scholarshipRequestsError,
        isFetching,
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <div style={{ display: 'flex', gap: '8px', flexDirection: "row" }}>
                <TableButton
                    Icon={<IconEye size={16} />}
                    onClick={() => navigate(`details/${row.original.id}`)}
                    label="Ver "
                />
            </div>
        ),
        enableRowSelection: false
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default ScholarshipRequestsTable