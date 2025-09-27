import { CardContent, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import BlankCard from "@components/shared/BlankCard"
import type { DiningStudent } from "@/types/dining/dining-student/entities/DiningStudent"

// Componente para mostrar tabla de estudiantes
interface StudentsTableProps {
    students: DiningStudent [] | undefined,
    title:string
}

const StudentsTable = ({ students, title }: StudentsTableProps) => {
    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'completado':
                return 'success'
            case 'pagado':
                return 'warning'
            default:
                return 'default'
        }
    }

    return (
        <BlankCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Estudiante</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Método</TableCell>
                                <TableCell>Monto</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students?.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {student?.student?.name} {student?.student?.lastName1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {formatTime(student?.timeIn.toString())}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={student.paymentMethod}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>₡{student.amountPaid}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={student.status}
                                            size="small"
                                            color={getStatusColor(student.status)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </BlankCard>
    )
}

export default StudentsTable