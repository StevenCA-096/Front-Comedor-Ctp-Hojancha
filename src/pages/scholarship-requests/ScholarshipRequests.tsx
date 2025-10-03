import StatsCard from "@/components/Cards/StatsCard"
import PageContainer from "../../components/container/page/PageContainer"
import ScholarshipRequestsTable from "./components/ScholarshipRequestsTable"
import { Grid2 } from "@mui/material"
import { Check, Error, Pending } from "@mui/icons-material"

const ScholarshipRequests = () => {
  return (
    <PageContainer title={'Solicitudes de beca'} >
      <Grid2 spacing={2} container>
        <Grid2 container size={{xs:12}} spacing={2}>
          <Grid2 size={{xs:12, lg:3}}>
            <StatsCard color="info" icon={<Check/>} title={'Total'} value={2}/>
          </Grid2>
          <Grid2 size={{xs:12, lg:3}}>
            <StatsCard color="success" icon={<Check/>} title={'Aprobadas'} value={2}/>
          </Grid2>
          <Grid2 size={{xs:12, lg:3}}>
            <StatsCard color="warning" icon={<Pending />} title={'Pendientes'} value={2}/>
          </Grid2>
          <Grid2 size={{xs:12, lg:3}}>
            <StatsCard color="error" icon={<Error />} title={'Rechazadas'} value={2}/>
          </Grid2>
        </Grid2>
        <Grid2 size={{xs:12}}>
          <ScholarshipRequestsTable />
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default ScholarshipRequests