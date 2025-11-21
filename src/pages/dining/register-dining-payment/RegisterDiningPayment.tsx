import PageContainer from "@components/container/page/PageContainer"
import SearchStudentByCedulaForm from "@components/forms/Student/SearchStudentByCedulaForm"
import { Alert, AlertTitle, Box, Divider, Grid2 } from "@mui/material"
import { getStudentPaymentInfo } from "@/services/dining-student/diningStudentService"
import { useState } from "react"
import StudentFoundData from "../components/StudentFoundData"
import ConfirmPayment from "./ConfirmPayment"
import LoadingScreen from "@components/LoadingScreen/LoadingScreen"
import { isAxiosError } from "axios"
import { useParams } from "react-router"
import { getDiningById } from "../../../services/dining/diningService"
import { formatDateStringWithDays } from "../../../utils/date/format-date"
import { useQuery } from "@tanstack/react-query"
import type StudentPaymentInfo from "@/types/dining/dining-student/dtos/studentPaymentInfo"

const RegisterDiningPayment = () => {
  const { diningId } = useParams<{ diningId: string }>();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | boolean>(false)
  const [studentData, setStudentData] = useState<StudentPaymentInfo | null>(null)
  const [hasPay, setHasPay] = useState<boolean>(false)

  const { data: exists, error: existsError, isLoading: existsLoading } = useQuery({
    queryFn: () => {
      if (!diningId) throw new Error("diningId is missing");
      return getDiningById(parseInt(diningId));
    }, queryKey: ['today-dining-stats'],
    refetchOnWindowFocus: false,
    enabled: !!diningId
  })

  const fetchData = async (data: { cedula: number }) => {
    setLoading(true)
    console.log(data.cedula)
    console.log(diningId)
    try {
      if (!diningId) {
        return setError('No se brindó un ID')
      }
      const result = await getStudentPaymentInfo(data?.cedula, parseInt(diningId)).finally(() => setLoading(false)) as StudentPaymentInfo
      setStudentData(result)
      setHasPay(result?.hasPay)
      console.log(result)
      setError(false)
    } catch (error) {
      if (isAxiosError(error) && error.status == 404) {
        setStudentData(null)
        document.getElementById('cedula-scan')?.focus()
        return setError('Estudiante no encontrado: ' + data?.cedula)
      }
    }
  }

  return (
    <PageContainer
      title={
        `Registrar pagos de ${exists?.mealTime} - ${exists?.openingDate && formatDateStringWithDays(exists?.openingDate as string)}`
      }
      showBackButton
    >
      {
        existsError && !loading && (
          <Box>
            <Alert severity="warning" variant="filled">
              <AlertTitle>
                No hay una caja abierta para hoy
              </AlertTitle>
            </Alert>
          </Box>
        )
      }
      {
        existsLoading ? <LoadingScreen /> : (
          !existsError && !!exists &&
          <>
            <Grid2 container sx={{ alignItems: 'center' }}>
              <Grid2 size={12} mb={1}>
                <SearchStudentByCedulaForm handleOnSubmit={fetchData} loading={loading} />
              </Grid2>
              <Grid2 >
                {error &&
                  <Alert severity="warning" variant="filled" sx={{ mb: 3 }}>
                    <AlertTitle>
                      {error}
                    </AlertTitle>
                  </Alert>
                }
              </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container mt={2} spacing={2}>
              {
                studentData &&
                <>
                  <Grid2 size={{xs:12, md:6}}>
                    <StudentFoundData data={studentData} />
                  </Grid2>
                  <Grid2 size={{xs:12, md:6}}>
                    <ConfirmPayment hasPay={!!hasPay} setHasPay={setHasPay} studentPaymentData={studentData} />
                  </Grid2>
                </>
              }
            </Grid2>
          </>
        )
      }
    </PageContainer>
  )
}

export default RegisterDiningPayment