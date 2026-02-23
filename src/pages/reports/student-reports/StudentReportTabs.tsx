import { Divider, Grid2, Tab, Tabs, useTheme } from "@mui/material"
import StudentReportHeader from "./components/StudentReportHeader"
import { ContactEmergency, Description, Person, Schedule, School } from "@mui/icons-material"
import StudentInfoTab from "./components/StudentInfoTab"
import AcademicInfoTab from "./components/AcademicInfoTab"
import ResponsibleInfoTab from "./components/ResponsibleInfoTab"
import DocumentsTab from "./components/DocumentsTab"
import StudentEnrollmentsTab from "./components/StudentEnrollmentsTab"
import useIsMobile from "@/hooks/isMobile/useIsMobile"
import { useState } from "react"
import type { StudentReportDto } from "@/types/student/dto/student-report.dto"

interface StudentReportTabsProps {
    filePaths: string[]
    studentData: StudentReportDto
}

const StudentReportTabs = ({ filePaths, studentData }: StudentReportTabsProps) => {
    const isMobile = useIsMobile()
    const theme = useTheme()
    const [activeTab, setActiveTab] = useState(0)
    return (
        <Grid2 container>
            {/* Header with, picture, name and status */}

            <Grid2 size={{ xs: 12, md: 3 }} mt={3}>
                <StudentReportHeader filePaths={filePaths} studentData={studentData} />
            </Grid2>
            <Divider />
            <Grid2 size={{ xs: 12, md: 9 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{
                        mb: 3,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                    variant={isMobile ? 'scrollable' : "fullWidth"}
                    scrollButtons="auto"
                >
                    <Tab icon={<Person />} iconPosition="start" label="Personal" />
                    <Tab icon={<School />} iconPosition="start" label="Académica" />
                    <Tab icon={<ContactEmergency />} iconPosition="start" label="Responsable" />
                    <Tab icon={<Description />} iconPosition="start" label="Documentos" />
                    <Tab icon={<Schedule />} iconPosition="start" label="Matrículas" />
                </Tabs>
                {/* Tab 0: Personal Info*/}
                {activeTab === 0 && (
                    <StudentInfoTab studentData={studentData} />
                )}

                {/* Tab 1: Academic information */}
                {activeTab === 1 && (
                    <AcademicInfoTab studentData={studentData} />
                )}

                {/* Tab 2: Responsible information */}
                {activeTab === 2 && (
                    <ResponsibleInfoTab studentData={studentData} />
                )}

                {/* Tab 3: Documents */}
                {activeTab === 3 && (
                    <DocumentsTab filePaths={filePaths} cedula={parseInt(studentData.cedula)}/>
                )}
                {/* Tab 3: Documents */}
                {activeTab === 4 && (
                    <StudentEnrollmentsTab cedula={parseInt(studentData.cedula)} />
                )}
            </Grid2>
        </Grid2>

    )
}

export default StudentReportTabs