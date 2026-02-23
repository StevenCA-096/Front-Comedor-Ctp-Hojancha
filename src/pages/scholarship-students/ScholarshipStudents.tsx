import PageContainer from "../../components/container/page/PageContainer"
import { useState } from "react"
import ScholarshipStudentsTable from "./components/ScholarshipStudentsTable"
import ViewToggleButton, { type ViewMode } from "@/components/Buttons/ViewToggleButton"
import useIsMobile from "@/hooks/isMobile/useIsMobile"
import ScholarshipStudentsCards from "./components/ScholarshipStudentsCards"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const ScholarshipStudents = () => {
  const isMobile = useIsMobile()
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "cards" : "table")

  return (
    <PageContainer
      title={'Estudiantes becados'}
      description={`Estudiantes con beca activa para el ciclo ${selectedYear}`}
      action={
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="scholarship-year-select-label">Ciclo</InputLabel>
            <Select
              labelId="scholarship-year-select-label"
              id="scholarship-year-select"
              label="Ciclo"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value.toString()))}
            >
              <MenuItem value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</MenuItem>
              <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
              <MenuItem value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</MenuItem>
            </Select>
          </FormControl>
          <ViewToggleButton viewMode={viewMode} onChange={setViewMode} />
        </Box>
      }
    >
      {viewMode === "table" ? (
        <ScholarshipStudentsTable year={selectedYear} />
      ) : (
        <ScholarshipStudentsCards year={selectedYear} itemsPerPage={isMobile ? 4 : 6} />
      )}
    </PageContainer>
  )
}

export default ScholarshipStudents
