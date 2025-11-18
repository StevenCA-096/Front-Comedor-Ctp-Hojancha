import { useState } from "react"
import { CardContent, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from "@mui/material"
import BlankCard from "@components/shared/BlankCard"
import type { DiningStudent } from "@/types/dining/dining-student/entities/DiningStudent"

// Componente para mostrar tabla de estudiantes
interface StudentsTableProps {
    students: DiningStudent[] | undefined,
    title: string
}

const StudentsTable = ({ students, title }: StudentsTableProps) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

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

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 5))
        setPage(0)
    }

    // Calcular estudiantes a mostrar en la página actual
    const paginatedStudents = students?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    return (
        <BlankCard>
            <CardContent>
                <Typography variant="h5" gutterBottom>
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
                            {paginatedStudents?.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {student?.student?.name} {student?.student?.lastName1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {formatTime(student?.timeIn?.toString())}
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
                    <TablePagination
                        rowsPerPageOptions={[5, 14, 21]}
                        component="div"
                        count={students?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página:"
                        labelDisplayedRows={({ from, to, count }) => 
                            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                        }
                    />
                </TableContainer>
            </CardContent>
        </BlankCard>
    )
}

export default StudentsTable