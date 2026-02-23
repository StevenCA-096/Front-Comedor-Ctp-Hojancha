import { Grid2 } from '@mui/material'
import {
    Person,
    Badge,
    Wc,
    Phone,
    Email,
    Work,
    Public
} from '@mui/icons-material'
import type { StudentReportDto } from '@/types/student/dto/student-report.dto'
import InfoItem from '@/components/shared/InfoItem'

interface ResponsibleInfoTabProps {
    studentData: StudentReportDto
}

const ResponsibleInfoTab = ({ studentData }: ResponsibleInfoTabProps) => {

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Person />}
                    label="Nombre Completo"
                    value={`${studentData.responsibleName} ${studentData.responsibleLastName1} ${studentData.responsibleLastName2}`}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Badge />}
                    label="Cédula"
                    value={studentData.responsibleCedula}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Wc />}
                    label="Género"
                    value={studentData.responsibleSex}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Phone />}
                    label="Teléfono Móvil"
                    value={studentData.responsibleMobilePhone.toString()}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Phone />}
                    label="Teléfono Fijo"
                    value={studentData.responsibleHomePhone ? studentData.responsibleHomePhone.toString() : 'No registrado'}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Email />}
                    label="Correo Electrónico"
                    value={studentData.responsibleEmail}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <InfoItem
                    icon={<Work />}
                    label="Ocupación"
                    value={studentData.responsibleOccupation}
                    color="success"
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
                <InfoItem
                    icon={<Public />}
                    label="Nacionalidad"
                    value={studentData.responsibleCountry}
                    color="success"
                />
            </Grid2>
        </Grid2>
    )
}

export default ResponsibleInfoTab