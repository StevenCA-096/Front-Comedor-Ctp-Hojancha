import { useParams } from "react-router-dom";
import PageContainer from "@/components/container/page/PageContainer";
import useScholarshipRequestsByID from "@/hooks/api/scholarship-request/queries/useScholarshipRequestById";
import {
  Grid2,
  Stack,
  Alert
} from "@mui/material";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import AssignScholarship from "./components/AssignScholarship";
import ResponsibleInfo from "./components/ResponsibleInfo";
import StudentInfo from "./components/StudentInfo";
import SocioeconomicInfo from "./components/SocioeconomicInfo";

const ScholarshipRequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: scholarshipRequest, isLoading, isError, refetch } = useScholarshipRequestsByID(
    id ? parseInt(id) : 0
  );

  if (isLoading) {
    return (
      <PageContainer title="Detalles de Solicitud de Beca" showBackButton>
        <LoadingScreen />
      </PageContainer>
    );
  }

  if (isError || !scholarshipRequest) {
    return (
      <PageContainer title="Detalles de Solicitud de Beca" showBackButton>
        <Alert severity="error">Error al cargar la solicitud</Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Detalles de Solicitud de Beca" showBackButton>
      <Grid2 container spacing={3}>
        {/* Columna Izquierda */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Stack spacing={3} >
            <ResponsibleInfo responsible={scholarshipRequest?.student?.responsible} />
            <SocioeconomicInfo socioeconomic={scholarshipRequest?.student?.socioeconomicInformation[0]} />
          </Stack>
        </Grid2>

        {/* Columna Derecha */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <StudentInfo student={scholarshipRequest.student} />
            {/* Component in charge of updating the request */}
            <AssignScholarship refetch={refetch} scholarshipRequest={scholarshipRequest} />
          </Stack>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default ScholarshipRequestDetails;