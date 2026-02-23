import { useState, useEffect } from 'react'
import {
    Box,
    Alert,
    Card,
    CardContent,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import useStudentByCedula from '@/hooks/api/student/queries/useStudentByCedula'
import PageContainer from '@/components/container/page/PageContainer'
import SearchStudentByCedulaForm from '@/components/forms/Student/SearchStudentByCedulaForm'
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'
import StudentReportTabs from './StudentReportTabs'
import useGetStudentFiles from '@/hooks/files/queries/useGetStudentFiles'

const StudentReports = () => {
    const [cedula, setCedula] = useState<number>(0)

    const { cedulaParam } = useParams<{ cedulaParam: string }>()

    const { data: studentData, isLoading, error } = useStudentByCedula(cedula)
    const {data: filePaths} = useGetStudentFiles(cedula)

    useEffect(() => {
        if (cedulaParam && cedulaParam !== '0') {
            setCedula(parseInt(cedulaParam))
        }
    }, [cedulaParam])

    if (isLoading) {
        return (
            <PageContainer title='Reporte de Estudiante'>
                <LoadingScreen />
            </PageContainer>
        )
    }

    return (
        <PageContainer title='Reporte de Estudiante' description='Consulte información detallada de un estudiante'>

            <Box sx={{ mb: 3 }}>
                <SearchStudentByCedulaForm loading={isLoading} handleOnSubmit={async ({ cedula }) => setCedula(cedula)} />
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Error al buscar el estudiante. Por favor, verifique la cédula.
                </Alert>
            )}

            {studentData && (
                <Card>
                    <CardContent>
                        <StudentReportTabs
                            filePaths={filePaths || []}
                            studentData={studentData}
                        />
                    </CardContent>
                </Card>

            )}
        </PageContainer>
    )
}

export default StudentReports