import { Grid2 } from '@mui/material'
import {
    Person,
    Badge,
    Wc,
    Public,
    LocationCity,
    Email,
    Home,
    CalendarMonth,
    Place
} from '@mui/icons-material'
import type { StudentReportDto } from '@/types/student/dto/student-report.dto'
import InfoItem from '@/components/shared/InfoItem'

interface StudentInfoTabProps {
    studentData: StudentReportDto
}

const StudentInfoTab = ({ studentData }: StudentInfoTabProps) => {

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<Person />}
                    label="Nombre Completo"
                    value={`${studentData.name} ${studentData.lastName1} ${studentData.lastName2}`}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<Badge />}
                    label="Cédula"
                    value={studentData.cedula}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<Wc />}
                    label="Género"
                    value={studentData.sex}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<CalendarMonth />}
                    label="Fecha de Nacimiento"
                    value={new Date(studentData.birthday).toLocaleDateString('es-CR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg:4 }}>
                <InfoItem
                    icon={<Place />}
                    label="Lugar de Nacimiento"
                    value={studentData.birthplace}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Public />}
                    label="Nacionalidad"
                    value={studentData.country}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<LocationCity />}
                    label="Cantón"
                    value={studentData.canton}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<LocationCity />}
                    label="Distrito"
                    value={studentData.district}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Email />}
                    label="Correo Personal"
                    value={studentData.personalEmail}
                    color="primary"
                />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                <InfoItem
                    icon={<Home />}
                    label="Dirección"
                    value={studentData.address}
                    color="primary"
                />
            </Grid2>
        </Grid2>
    )
}

export default StudentInfoTab