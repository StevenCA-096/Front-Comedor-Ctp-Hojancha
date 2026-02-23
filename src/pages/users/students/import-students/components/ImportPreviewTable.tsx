import { useMemo } from 'react'
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material'
import { IconAlertTriangle, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import useCustomMaterialTable from '@/utils/mui-datatable/materialTableConfig'
import type { ParsedImportRow, RowValidationError } from '../types/import.types'

interface ImportPreviewTableProps {
  data: ParsedImportRow[]
  validationErrors: RowValidationError[]
  isImporting: boolean
  onConfirm: () => void
  onBack: () => void
}

const ImportPreviewTable = ({
  data,
  validationErrors,
  isImporting,
  onConfirm,
  onBack,
}: ImportPreviewTableProps) => {
  const errorMap = useMemo(() => {
    const map: Record<number, string[]> = {}
    validationErrors.forEach(({ rowIndex, messages }) => {
      map[rowIndex] = messages
    })
    return map
  }, [validationErrors])

  const hasErrors = validationErrors.length > 0
  const validRows = data.length - validationErrors.length

  const columns = useMemo<MRT_ColumnDef<ParsedImportRow>[]>(
    () => [
      {
        id: 'status',
        header: 'Estado',
        size: 90,
        Cell: ({ row }) => {
          const errors = errorMap[row.index]
          return errors ? (
            <Tooltip title={errors.join(' | ')} arrow>
              <Chip label="Error" color="error" size="small" icon={<IconAlertTriangle size={14} />} />
            </Tooltip>
          ) : (
            <Chip label="OK" color="success" size="small" variant="outlined" />
          )
        },
      },
      {
        accessorKey: 'student.cedula',
        header: 'Cédula',
        size: 120,
      },
      {
        accessorKey: 'student.name',
        header: 'Nombre',
        size: 130,
      },
      {
        accessorKey: 'student.lastName1',
        header: 'Apellido 1',
        size: 130,
      },
      {
        accessorKey: 'student.lastName2',
        header: 'Apellido 2',
        size: 130,
      },
      {
        accessorKey: 'student.sex',
        header: 'Sexo',
        size: 80,
      },
      {
        accessorKey: 'student.country',
        header: 'País',
        size: 100,
      },
      {
        accessorKey: 'student.birthday',
        header: 'Fecha Nac.',
        size: 110,
      },
      {
        accessorKey: 'student.canton',
        header: 'Cantón',
        size: 110,
      },
      {
        accessorKey: 'student.requireTransport',
        header: 'Transporte',
        size: 100,
        Cell: ({ row }) =>
          row.original.student.requireTransport != null ? (
            <Chip
              label={row.original.student.requireTransport ? 'Sí' : 'No'}
              size="small"
              color={row.original.student.requireTransport ? 'info' : 'default'}
              variant="outlined"
            />
          ) : (
            <Typography variant="caption" color="text.disabled">—</Typography>
          ),
      },
      {
        accessorKey: 'responsible.cedula',
        header: 'Cédula Resp.',
        size: 130,
        Cell: ({ row }) => (
          <Typography variant="body2" color={row.original.responsible ? 'text.primary' : 'text.disabled'}>
            {row.original.responsible?.cedula ?? '—'}
          </Typography>
        ),
      },
      {
        accessorKey: 'responsible.name',
        header: 'Nombre Resp.',
        size: 140,
        Cell: ({ row }) => (
          <Typography variant="body2" color={row.original.responsible ? 'text.primary' : 'text.disabled'}>
            {row.original.responsible?.name ?? '—'}
          </Typography>
        ),
      },
      {
        accessorKey: 'responsible.occupation',
        header: 'Ocupación Resp.',
        size: 150,
        Cell: ({ row }) => (
          <Typography variant="body2" color={row.original.responsible ? 'text.primary' : 'text.disabled'}>
            {row.original.responsible?.occupation ?? '—'}
          </Typography>
        ),
      },
    ],
    [errorMap]
  )

  const table = useCustomMaterialTable<ParsedImportRow>({
    columns,
    data,
    isLoading: false,
    isFetching: false,
    isLoadingError: false,
    enableRowSelection: false,
    enableRowActions: false,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
        <Chip label={`${data.length} filas totales`} size="small" />
        <Chip label={`${validRows} válidas`} color="success" size="small" variant="outlined" />
        {hasErrors && (
          <Chip
            label={`${validationErrors.length} con errores`}
            color="error"
            size="small"
            variant="outlined"
          />
        )}
      </Box>
    ),
  })

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button startIcon={<IconArrowLeft size={16} />} onClick={onBack} variant="outlined" size="small">
          Volver
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {hasErrors && (
            <Typography variant="caption" color="error" sx={{ alignSelf: 'center' }}>
              {validationErrors.length} fila(s) con errores serán omitidas
            </Typography>
          )}
          <Button
            variant="contained"
            startIcon={<IconDeviceFloppy size={16} />}
            onClick={onConfirm}
            disabled={isImporting || validRows === 0}
            loading={isImporting}
          >
            Importar {validRows} estudiante{validRows !== 1 ? 's' : ''}
          </Button>
        </Box>
      </Box>

      <MaterialReactTable table={table} />
    </Box>
  )
}

export default ImportPreviewTable
