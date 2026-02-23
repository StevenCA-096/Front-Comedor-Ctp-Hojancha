import { Grid2 } from '@mui/material'
import {
    School,
    AccountBalance,
    RoomPreferences,
    Class,
    DirectionsBus,
    Email,
    CalendarMonth
} from '@mui/icons-material'
import type { StudentReportDto } from '@/types/student/dto/student-report.dto'
import InfoItem from '@/components/shared/InfoItem'

interface AcademicInfoTabProps {
    studentData: StudentReportDto
}

const AcademicInfoTab = ({ studentData }: AcademicInfoTabProps) => {

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<AccountBalance />}
                    label="Última Institución"
                    value={studentData.lastInstitution}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<RoomPreferences />}
                    label="Adecuación Curricular"
                    value={studentData.adequacy}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Class />}
                    label="Grado"
                    value={studentData.grade}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Class />}
                    label="Sección"
                    value={studentData.sectionName}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<School />}
                    label={['Séptimo', 'Octavo', 'Noveno'].includes(studentData.grade) ? 'Taller' : 'Especialidad'}
                    value={studentData.areaName}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<DirectionsBus />}
                    label="Requiere Transporte"
                    value={studentData.requireTransport === 1 ? 'Sí' : 'No'}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<DirectionsBus />}
                    label="Ruta de Transporte"
                    value={studentData.transportRoute}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<Email />}
                    label="Correo MEP"
                    value={studentData.mepEmail || 'No asignado'}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<CalendarMonth />}
                    label="Año de Ingreso"
                    value={studentData.anio_ingreso?.toString()}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<CalendarMonth />}
                    label="Año de Salida"
                    value={studentData.anio_salida?.toString() || 'Activo'}
                    color="primary"
                />
            </Grid2>
        </Grid2>
    )
}

export default AcademicInfoTab