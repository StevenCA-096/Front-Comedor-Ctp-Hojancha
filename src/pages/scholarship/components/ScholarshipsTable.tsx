import TableButton from "@/components/Buttons/TableButton";
import CustomChip from "@/components/Chip/CustomChip";
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity";
import useCustomMaterialTable from "@/utils/mui-datatable/materialTableConfig";
import { IconAdjustments, IconEdit } from "@tabler/icons-react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

interface ScholarshipsTableProps {
  scholarships: Scholarship[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onEdit: (scholarship: Scholarship) => void;
  onAvailability: (scholarship: Scholarship, year: number) => void;
}

const getCoverageColor = (coverage: number) => {
  if (coverage === 0) return "error";
  if (coverage <= 50) return "warning";
  return "success";
};

const ScholarshipsTable = ({
  scholarships,
  isLoading,
  isFetching,
  isError,
  onEdit,
  onAvailability,
}: ScholarshipsTableProps) => {
  const currentYear = new Date().getFullYear();

  const columns = useMemo<MRT_ColumnDef<Scholarship>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Beca",
      },
      {
        accessorKey: "coverage",
        header: "Cobertura",
        Cell: ({ cell }) => {
          const coverage = cell.getValue<number>();
          return (
            <CustomChip
              label={`${coverage}%`}
              color={getCoverageColor(coverage)}
            />
          );
        },
      },
      {
        id: "quotaCurrentYear",
        header: `Cupos ${currentYear}`,
        Cell: ({ row }) => {
          const quota = row.original.scholarship_availabilities?.find(
            (item) => item.year === currentYear,
          )?.quota;
          return quota ?? 0;
        },
      },
      {
        id: "quotaNextYear",
        header: `Cupos ${currentYear + 1}`,
        Cell: ({ row }) => {
          const quota = row.original.scholarship_availabilities?.find(
            (item) => item.year === currentYear + 1,
          )?.quota;
          return quota ?? 0;
        },
      },
    ],
    [currentYear],
  );

  const table = useCustomMaterialTable<Scholarship>({
    columns,
    data: scholarships,
    isLoading,
    isLoadingError: isError,
    isFetching,
    enableRowSelection: false,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <div style={{ display: "flex", gap: "8px", flexDirection: "row" }}>
        <TableButton
          Icon={<IconEdit size={16} />}
          label="Editar"
          onClick={() => onEdit(row.original)}
        />
        <TableButton
          Icon={<IconAdjustments size={16} />}
          label={`Cupos ${currentYear}`}
          onClick={() => onAvailability(row.original, currentYear)}
        />
        <TableButton
          Icon={<IconAdjustments size={16} />}
          label={`Cupos ${currentYear + 1}`}
          onClick={() => onAvailability(row.original, currentYear + 1)}
        />
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ScholarshipsTable;
