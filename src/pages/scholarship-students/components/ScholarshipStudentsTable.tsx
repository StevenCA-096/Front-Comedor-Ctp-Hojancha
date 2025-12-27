import TableButton from "@/components/Buttons/TableButton";
import CustomChip from "@/components/Chip/CustomChip";
import useActiveScholarshipStudentsByYear from "@/hooks/api/scholarship-request/queries/useActiveScholarshipStudentsByYear";
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest";
import { formatDateWithDaysAndHour } from "@/utils/date/format-date";
import useCustomMaterialTable from "@/utils/mui-datatable/materialTableConfig";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";

const ScholarshipStudentsTable = ({ year }: { year: number }) => {
    const { data: scholarshipRequests, isLoading, isError, isFetching } = useActiveScholarshipStudentsByYear(year)
    const navigate = useNavigate()

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
            header: 'Beca activa',
            Cell: ({ cell }) => (
                <CustomChip
                    label={cell.getValue<string>() || 'Sin Resolución'}
                    color={cell.getValue() ? 'primary' : 'warning'}
                />
            ),
        },
        {
            accessorKey: 'status',
            header: 'Estado',
        },
        {
            accessorKey: 'resolutionDate',
            header: 'Fecha de aprobacion',
            Cell: ({ cell }) => (
                <CustomChip
                    label={cell.getValue<string>() && formatDateWithDaysAndHour(new Date(cell.getValue<string>())) || 'Sin Resolución'}
                    color={cell.getValue() ? 'primary' : 'warning'}
                />
            ),
        },
    ];

    // Custom hook using the material table configuration
    const table = useCustomMaterialTable<ScholarshipRequest>({
        columns,
        data: scholarshipRequests || [],
        isLoading: isLoading,
        isLoadingError: !!isError,
        isFetching,
        enableRowActions: true,
        renderTopToolbarCustomActions: () =>
            <FormControl>
                <InputLabel id="assign-scholarship-label">Ciclo</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="assign-scholarship-label"
                    label='Ciclo'
                    defaultValue={year}
                >
                    <MenuItem value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</MenuItem>
                    <MenuItem value={new Date().getFullYear() -1}>{new Date().getFullYear() - 1}</MenuItem>
                    <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                </Select>
            </FormControl>
        ,
        renderRowActions: ({row}) => (
            <div style={{ display: 'flex', gap: '8px', flexDirection: "row" }}>
                <TableButton
                    Icon={<IconEye size={16} />}
                    label="Ver"
                    onClick={() => navigate('details/'+row.original.id)}
                />
            </div>
        ),
    });

    return (
        <MaterialReactTable table={table} />
    )
}

export default ScholarshipStudentsTable