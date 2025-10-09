import PageContainer from "../../components/container/page/PageContainer"
import { useState } from "react"
import ScholarshipStudentsTable from "./components/ScholarshipStudentsTable"

const ScholarshipStudents = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  console.log(setSelectedYear)

  return (
    <PageContainer title={'Estudiantes becados'} description={`Estudiantes con beca activa para el ciclo ${selectedYear}`}>
      <ScholarshipStudentsTable year={selectedYear}/>
    </PageContainer>
  )
}

export default ScholarshipStudents