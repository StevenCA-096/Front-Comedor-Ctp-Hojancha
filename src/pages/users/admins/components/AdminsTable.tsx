import { useMemo } from 'react'
import { Chip, Typography } from '@mui/material'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import useCustomMaterialTable from '@/utils/mui-datatable/materialTableConfig'
import { formatDateWithDaysAndHour } from '@/utils/date/format-date'
import type { User } from '@/types/common/user/user'
import TableExportToolbar from '@/components/table/TableExportToolbar'
import TableButton from '@/components/Buttons/TableButton'
import { IconEye } from '@tabler/icons-react'

interface AdminsTableProps {
  admins: User[]
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  handleOpenModal: (admin: User) => void
}

const AdminsTable = ({ admins, isLoading, isFetching, isError, handleOpenModal }: AdminsTableProps) => {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'dni',
        header: 'Cédula',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'admin.name',
        header: 'Nombre',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'admin.firstLastName',
        header: '1 Apellido',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'admin.secondLastName',
        header: '2 Apellido',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'createdAt',
        header: 'Fecha de creación',
        Cell:({row}) => <Typography>{formatDateWithDaysAndHour(new Date(row?.original?.createdAt))}</Typography>
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        Cell: ({ row }) => (
          <Chip
            label={row?.original?.status ? 'Activo' : 'Inactivo'}
            color={row?.original?.status ? 'success' : 'error'}
            size="small"
            variant="outlined"
          />
        ),
      },
    ],
    []
  )

  const table = useCustomMaterialTable({
    columns,
    data: admins,
    isLoading: isLoading,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <TableButton
        color="primary"
        onClick={() => handleOpenModal(row.original)}
        label='Ver Administrador'
        Icon={<IconEye />}
      />
    ),
    isFetching,
    isLoadingError: isError,
    enableRowSelection: false,
    renderTopToolbarCustomActions: () => (
            <TableExportToolbar
                data={admins} 
                filename="Administradores/Colaboradores"
                columns={columns}
            />
        ),
  })

  return <MaterialReactTable table={table} />
}

export default AdminsTable
