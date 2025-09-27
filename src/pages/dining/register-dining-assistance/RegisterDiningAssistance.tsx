import PageContainer from "@components/container/page/PageContainer"
import SearchStudentByCedulaForm from "@components/forms/Student/SearchStudentByCedulaForm"
import { Alert, AlertTitle, Box, Divider, Grid } from "@mui/material"
import { getStudentPaymentInfo } from "@services/dining-student/diningStudentService"
import { useState } from "react"
import StudentFoundData from "../components/StudentFoundData"
import { getDiningById } from "@services/dining/diningService"
import LoadingScreen from "@components/LoadingScreen/LoadingScreen"
import { isAxiosError } from "axios"
import ConfirmAssistance from "./ConfirmAssistance"
import { useParams } from "react-router"
import { confirmStudentAssistance } from "@services/dining-student/diningStudentService"
import toast from "react-hot-toast"
import { formatDateStringWithDays } from "@utils/date/format-date"
import successSound from '@assets/sounds/payment-assistance-register/ok.wav'
import errSound from '@assets/sounds/payment-assistance-register/err.wav'
import { playSound } from "../../../utils/audio/playAudio"
import { useQuery } from "@tanstack/react-query"
import type StudentPaymentInfo from "@/types/dining/dining-student/dtos/studentPaymentInfo"

//This is the main commponent for student assistance register
const RegisterDiningAssistance = () => {
  const { diningId } = useParams<{ diningId: string }>();

  const [loading, setLoading] = useState(false)
  const [studentPaymentInfo, setStudentPaymentInfo] = useState<StudentPaymentInfo | null>(null)
  const [error, setError] = useState<boolean | string>(false)

  const { data: exists, error: existsError, isLoading: existsLoading } = useQuery({
    queryFn: () => {
      if (!diningId) throw new Error("diningId is missing");
      return getDiningById(parseInt(diningId));
    },
    queryKey: ['today-dining-stats'],
    retry: false,
    refetchOnWindowFocus: false,
  })

  //Fetch student info, if there is a student and he has already paid, plays a success sound, if not an err sound
  //if the student has already paid but also confirrmed his assistance it will play an err sound
  //if no student is found it will also trigger an err sound
  const fetchData = async (data: {cedula: number}) => {
    if (!diningId) {
      return setError('No se brindó el ID')
    }
    
    setLoading(true)
    try {
      const result = await getStudentPaymentInfo(data?.cedula, parseInt(diningId)).finally(() => setLoading(false)) as StudentPaymentInfo
      setStudentPaymentInfo(result)
      console.log(result)
      if (result?.hasPay) {
        try {
          const confirmed = await confirmStudentAssistance(result?.diningStudentId?.id)
          if (!isAxiosError(confirmed)) {
            toast.success('Asistencia confirmada')
            playSound(successSound)
          } else {
            playSound(errSound)
          }
        } catch (error) {
          console.log(error)
          setStudentPaymentInfo({ ...result, hasAssisted: true })
          toast.error('Ya asistió')
          playSound(errSound)
          return
        }
      }
      playSound(errSound)
      setError(false)
    } catch (error) {
      if (isAxiosError(error) && error.status == 404) {
        setStudentPaymentInfo(null)
        document.getElementById('cedula-scan')?.focus()
        playSound(errSound)
        return setError('Estudiante no encontrado: ' + data?.cedula)
      }
    }
  }

  return (
    <PageContainer
      title={
        `Registrar asistencias de ${exists?.mealTime} - ${exists?.openingDate && formatDateStringWithDays(exists?.openingDate)}`
      }
      showBackButton>
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
          !existsError && exists &&
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
            <Grid container mt={2} alignItems={'center'} spacing={2}>
              {
                studentPaymentInfo &&
                <>
                  <Grid item xs={6}>
                    <StudentFoundData data={studentPaymentInfo} />
                  </Grid>
                  <Grid item xs={6} >
                    <ConfirmAssistance studentPaymentData={studentPaymentInfo} />
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

export default RegisterDiningAssistance