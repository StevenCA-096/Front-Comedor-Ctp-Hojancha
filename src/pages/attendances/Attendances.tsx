import EmptyState from "@/components/EmptyState/EmptyState"
import DateRangeAndMealtimeForm, { type reportDateRangeSchemaType } from "@/components/forms/DateRangeAndMealTime/DateRangeAndMealtimeForm"
import { getDiningAttendancesByDateRange } from "@/services/dining/diningService"
import type { AttendanceReportDto } from "@/types/dining/dining/dtos/attendance-report,dto"
import PageContainer from "@components/container/page/PageContainer"
import { isAxiosError } from "axios"
import { useMemo, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import AttendancesTable from "./AttendancesTable"
import { Box } from "@mui/material"
import useIsMobile from "@/hooks/isMobile/useIsMobile"
import ViewToggleButton, { type ViewMode } from "@/components/Buttons/ViewToggleButton"
import AttendancesCards from "./AttendancesCards"
import ListFilters from "@/components/filters/ListFilters"
import useSearchAndSort from "@/hooks/filters/useSearchAndSort"

const Attendances = () => {
  const isMobile = useIsMobile()
  const [attendancesData, setAttendancesData] = useState<AttendanceReportDto[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "cards" : "table")

  const sortOptions = useMemo(
    () => [
      { key: "cedula", label: "Cedula", getValue: (item: AttendanceReportDto) => item.cedula },
      { key: "fullName", label: "Estudiante", getValue: (item: AttendanceReportDto) => item.fullName },
      { key: "mealTimeType", label: "Tiempo de comida", getValue: (item: AttendanceReportDto) => item.mealTimeType },
      { key: "timein", label: "Hora entrada", getValue: (item: AttendanceReportDto) => new Date(item.timein) },
      { key: "amountPaid", label: "Monto pagado", getValue: (item: AttendanceReportDto) => item.amountPaid },
    ],
    [],
  )

  const {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filteredSortedItems,
  } = useSearchAndSort({
    items: attendancesData || [],
    searchableText: (item) => JSON.stringify(item),
    sortOptions,
    defaultSortKey: "timein",
    defaultSortDirection: "desc",
  })

  const handleSubmit: SubmitHandler<reportDateRangeSchemaType> = async (data) => {
    try {
      setLoading(true)
      const result = await getDiningAttendancesByDateRange(data.startDate, data.endDate, data.mealTime)
      if (!isAxiosError(result)) {
        setAttendancesData(result)
      }
    } catch (error) {
      toast.error('Error al consultar la informacion')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer
      title={'Asistencias'}
      action={<ViewToggleButton viewMode={viewMode} onChange={setViewMode} />}
    >
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <DateRangeAndMealtimeForm title="Asistencias al comedor" onSubmit={handleSubmit} loading={loading} />
        {viewMode === "cards" && !!attendancesData?.length && (
          <ListFilters
            search={search}
            onSearchChange={setSearch}
            sortKey={sortKey}
            onSortKeyChange={setSortKey}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
            sortOptions={sortOptions}
            defaultExpanded={!isMobile}
          />
        )}
        {
          attendancesData?.length == 0 ?
            <EmptyState text="No hay asistencias registradas en el rango de fechas brindado"/>
            :
            attendancesData != null &&
            (viewMode === "table" ? (
              <AttendancesTable data={attendancesData} />
            ) : (
              <AttendancesCards
                data={filteredSortedItems}
                isLoading={loading}
                isError={false}
                itemsPerPage={isMobile ? 4 : 6}
              />
            ))
        }
      </Box>

    </PageContainer>
  )
}

export default Attendances
