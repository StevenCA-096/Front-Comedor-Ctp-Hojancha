import StatsCard from "@/components/Cards/StatsCard"
import PageContainer from "../../../components/container/page/PageContainer"
import ScholarshipRequestsTable from "./components/ScholarshipRequestsTable"
import { Grid2 } from "@mui/material"
import { Check, Error, Pending } from "@mui/icons-material"
import useScholarshipRequestsList from "@/hooks/api/scholarship-request/queries/useScholarshipRequestsList"
import type { ScholarshipRequestStatus } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"

const ScholarshipRequests = () => {
  const { data: scholarshipRequests = [], isLoading: scholarshipRequestsLoading } = useScholarshipRequestsList();

  const getCountByStatus = (status: ScholarshipRequestStatus) => {
    return scholarshipRequests?.filter((scholarshipRequest) => scholarshipRequest.status == status).length
  }
  return (
    <PageContainer title={'Solicitudes de beca'} >
      <Grid2 spacing={2} container>
        <Grid2 container size={{ xs: 12 }} spacing={2}>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="info" icon={<Check />} title={'Total'} value={scholarshipRequests.length} />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="success" icon={<Check />} title={'Aprobadas'} value={getCountByStatus('Aprobado')} />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="warning" icon={<Pending />} title={'Pendientes'} value={getCountByStatus('Pendiente')} />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="error" icon={<Error />} title={'Rechazadas'} value={getCountByStatus('Rechazado')} />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <ScholarshipRequestsTable />
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default ScholarshipRequests