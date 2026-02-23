import TableButton from '@/components/Buttons/TableButton'
import TableExportToolbar from '@/components/table/TableExportToolbar'
import type { User } from '@/types/common/user/user'
import type { Student } from '@/types/student/Student'
import useCustomMaterialTable from '@/utils/mui-datatable/materialTableConfig'
import { IconEye } from '@tabler/icons-react'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'

interface StudentsTableProps {
    students: User[]
    isLoading: boolean
    isFetching: boolean
    isError: boolean
    handleOpen: (dni: Student['cedula']) => void
}

// Shape that matches the import CSV column headers exactly
interface FlatStudentRow {
    cedula: string
    nombre: string
    apellido1: string
    apellido2: string
    sexo: string
    pais: string
    lugarNacimiento: string
    fechaNacimiento: string
    ultimaInstitucion: string
    adecuacion: string
    canton: string
    distrito: string
    direccion: string
    requiereTransporte: string
    correoPersonal: string
    correoMEP: string
    cedulaResponsable: string
    nombreResponsable: string
    apellido1Responsable: string
    apellido2Responsable: string
    sexoResponsable: string
    telefonoCasa: string
    telefonoCelular: string
    correoResponsable: string
    ocupacion: string
    paisResponsable: string
}

const flattenStudent = (user: User): FlatStudentRow => {
    const s = user.student
    const r = s?.responsible
    return {
        cedula:               String(s?.cedula ?? ''),
        nombre:               s?.name ?? '',
        apellido1:            s?.lastName1 ?? '',
        apellido2:            s?.lastName2 ?? '',
        sexo:                 s?.sex ?? '',
        pais:                 s?.country ?? '',
        lugarNacimiento:      s?.birthplace ?? '',
        fechaNacimiento:      s?.birthday ? new Date(s.birthday).toISOString().split('T')[0] : '',
        ultimaInstitucion:    s?.lastInstitution ?? '',
        adecuacion:           s?.adequacy ?? '',
        canton:               s?.canton ?? '',
        distrito:             s?.district ?? '',
        direccion:            s?.address ?? '',
        requiereTransporte:   s?.requireTransport ? 'Si' : 'No',
        correoPersonal:       s?.personalEmail ?? '',
        correoMEP:            s?.mepEmail ?? '',
        cedulaResponsable:    String(r?.cedula ?? ''),
        nombreResponsable:    r?.name ?? '',
        apellido1Responsable: r?.lastName1 ?? '',
        apellido2Responsable: r?.lastName2 ?? '',
        sexoResponsable:      r?.sex ?? '',
        telefonoCasa:         String(r?.homePhone ?? ''),
        telefonoCelular:      String(r?.mobilePhone ?? ''),
        correoResponsable:    r?.email ?? '',
        ocupacion:            r?.occupation ?? '',
        paisResponsable:      r?.country ?? '',
    }
}

const StudentsTable = ({ students, isLoading, isFetching, isError, handleOpen }: StudentsTableProps) => {

    // Only the flat rows are passed to the table — keeps MRT types clean
    const flatData = useMemo(() => students.map(flattenStudent), [students])

    // Columns shown in the UI (minimal view)
    const columns = useMemo<MRT_ColumnDef<FlatStudentRow>[]>(
        () => [
            {
                accessorKey: 'cedula',
                header: 'Cédula',
                enableClickToCopy: true,
                size: 120,
            },
            {
                accessorKey: 'nombre',
                header: 'Nombre',
                size: 130,
            },
            {
                accessorKey: 'apellido1',
                header: 'Apellido 1',
                size: 130,
            },
            {
                accessorKey: 'apellido2',
                header: 'Apellido 2',
                size: 130,
            },
            {
                accessorKey: 'sexo',
                header: 'Sexo',
                size: 90,
            },
        ],
        []
    )

    // All flat columns — used only by the export toolbar so the CSV
    // comes out with every field needed for re-import
    const exportColumns = useMemo<MRT_ColumnDef<FlatStudentRow>[]>(
        () => [
            { accessorKey: 'cedula',               header: 'cedula' },
            { accessorKey: 'nombre',               header: 'nombre' },
            { accessorKey: 'apellido1',            header: 'apellido1' },
            { accessorKey: 'apellido2',            header: 'apellido2' },
            { accessorKey: 'sexo',                 header: 'sexo' },
            { accessorKey: 'pais',                 header: 'pais' },
            { accessorKey: 'lugarNacimiento',      header: 'lugarNacimiento' },
            { accessorKey: 'fechaNacimiento',      header: 'fechaNacimiento' },
            { accessorKey: 'ultimaInstitucion',    header: 'ultimaInstitucion' },
            { accessorKey: 'adecuacion',           header: 'adecuacion' },
            { accessorKey: 'canton',               header: 'canton' },
            { accessorKey: 'distrito',             header: 'distrito' },
            { accessorKey: 'direccion',            header: 'direccion' },
            { accessorKey: 'requiereTransporte',   header: 'requiereTransporte' },
            { accessorKey: 'correoPersonal',       header: 'correoPersonal' },
            { accessorKey: 'correoMEP',            header: 'correoMEP' },
            { accessorKey: 'cedulaResponsable',    header: 'cedulaResponsable' },
            { accessorKey: 'nombreResponsable',    header: 'nombreResponsable' },
            { accessorKey: 'apellido1Responsable', header: 'apellido1Responsable' },
            { accessorKey: 'apellido2Responsable', header: 'apellido2Responsable' },
            { accessorKey: 'sexoResponsable',      header: 'sexoResponsable' },
            { accessorKey: 'telefonoCasa',         header: 'telefonoCasa' },
            { accessorKey: 'telefonoCelular',      header: 'telefonoCelular' },
            { accessorKey: 'correoResponsable',    header: 'correoResponsable' },
            { accessorKey: 'ocupacion',            header: 'ocupacion' },
            { accessorKey: 'paisResponsable',      header: 'paisResponsable' },
        ],
        []
    )

    const table = useCustomMaterialTable<FlatStudentRow>({
        columns,
        data: flatData,
        isLoading,
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <TableButton
                Icon={<IconEye />}
                onClick={() => handleOpen(Number(row.original.cedula) as Student['cedula'])}
            />
        ),
        isFetching,
        isLoadingError: isError,
        enableRowSelection: false,
        renderTopToolbarCustomActions: () => (
            <TableExportToolbar
                data={flatData}
                filename="estudiantes_exportacion"
                columns={exportColumns}
            />
        ),
    })

    return <MaterialReactTable table={table} />
}

export default StudentsTable