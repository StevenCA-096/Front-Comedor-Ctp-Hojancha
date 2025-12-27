import EmptyState from "@/components/EmptyState/EmptyState"
import DateRangeAndMealtimeForm, { type reportDateRangeSchemaType } from "@/components/forms/DateRangeAndMealTime/DateRangeAndMealtimeForm"
import { getDiningAttendancesByDateRange } from "@/services/dining/diningService"
import type { AttendanceReportDto } from "@/types/dining/dining/dtos/attendance-report,dto"
import PageContainer from "@components/container/page/PageContainer"
import { isAxiosError } from "axios"
import { useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import AttendancesTable from "./AttendancesTable"
import { Box } from "@mui/material"

const Attendances = () => {
  const [attendancesData, setAttendancesData] = useState<AttendanceReportDto[] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit: SubmitHandler<reportDateRangeSchemaType> = async (data) => {
    try {
      setLoading(true)
      const result = await getDiningAttendancesByDateRange(data.startDate, data.endDate, data.mealTime)
      if (!isAxiosError(result)) {
        setAttendancesData(result)
        console.log(result)
      }
    } catch (error) {
      toast.error('Error al consultar la informacion')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title={'Asistencias'}>
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <DateRangeAndMealtimeForm title="Asistencias al comedor" onSubmit={handleSubmit} loading={loading} />
        {
          attendancesData?.length == 0 ?
            <EmptyState />
            :
            attendancesData != null &&
            <AttendancesTable data={attendancesData} />
        }
      </Box>

    </PageContainer>
  )
}

export default Attendances