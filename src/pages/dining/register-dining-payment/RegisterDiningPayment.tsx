import PageContainer from "@components/container/page/PageContainer"
import SearchStudentByCedulaForm from "@components/forms/Student/SearchStudentByCedulaForm"
import { Alert, AlertTitle, Box, Divider, Grid } from "@mui/material"
import { getStudentPaymentInfo } from "@services/dining-student/diningStudentService"
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
    retry: false,
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
        `Registrar pagos de ${exists?.mealTime} - ${exists?.openingDate && formatDateStringWithDays(exists?.openingDate)}`
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
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={12}>
                <SearchStudentByCedulaForm handleOnSubmit={fetchData} loading={loading} />
              </Grid>
              <Grid item xs={12}>
                {error &&
                  <Alert severity="warning" variant="filled" sx={{ mb: 3 }}>
                    <AlertTitle>
                      {error}
                    </AlertTitle>
                  </Alert>
                }
              </Grid>
            </Grid>
            <Divider />
            <Grid container mt={2} spacing={2}>
              {
                studentData &&
                <>
                  <Grid item xs={6}>
                    <StudentFoundData data={studentData} />
                  </Grid>
                  <Grid item xs={6} >
                    <ConfirmPayment hasPay={!!hasPay} setHasPay={setHasPay} studentPaymentData={studentData} />
                  </Grid>
                </>
              }
            </Grid>
          </>
        )
      }
    </PageContainer>
  )
}

export default RegisterDiningPayment