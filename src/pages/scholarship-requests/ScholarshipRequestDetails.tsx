import { useParams } from "react-router-dom";
import PageContainer from "@/components/container/page/PageContainer";
import BlankCard from "@/components/shared/BlankCard";
import useScholarshipRequestsByID from "@/hooks/api/scholarship/queries/useScholarshipRequestById";

import {
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid2,
  Stack,
  Chip,
  Button,
  Alert
} from "@mui/material";
import { 
  IconUser, 
  IconSchool, 
  IconReportMoney, 
  IconBook,
  IconCheck,
  IconX
} from "@tabler/icons-react";
import CustomChip from "@/components/Chip/CustomChip";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const ScholarshipRequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: scholarshipRequest, isLoading, isError } = useScholarshipRequestsByID(
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
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Stack spacing={3} >
            <ResponsibleInfo responsible={scholarshipRequest?.student?.responsible} />
            <SocioeconomicInfo socioeconomic={scholarshipRequest?.student?.socioeconomicInformation[0]} />
          </Stack>
        </Grid2>

        {/* Columna Derecha */}
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Stack spacing={3}>
            <StudentInfo student={scholarshipRequest.student} />
            <AssignScholarship scholarship={scholarshipRequest.scholarship} />
          </Stack>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

/* ===========================
   SUBCOMPONENTES
=========================== */

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <Box display="flex" alignItems="center" gap={1.5} mb={3}>
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 2,
        bgcolor: 'primary.light',
        color: 'primary.main'
      }}
    >
      {icon}
    </Box>
    <Typography variant="h5" fontWeight={600}>{title}</Typography>
  </Box>
);

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Box display="flex" gap={1} mb={1.5}>
    <Typography variant="body1" color="text.secondary" sx={{ minWidth: '140px' }}>
      {label}:
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {value}
    </Typography>
  </Box>
);

const ResponsibleInfo = ({ responsible }: any) => (
  <BlankCard>
    <Box p={3} minHeight={{xs:'auto',md:250}}>
      <SectionTitle icon={<IconUser size={22} />} title="Responsable" />
      <Stack spacing={1}>
        <InfoRow label="Cédula" value={responsible.cedula} />
        <InfoRow 
          label="Nombre completo" 
          value={`${responsible.name} ${responsible.lastName1}`} 
        />
        <InfoRow label="Sexo" value={responsible.sex} />
        <InfoRow label="Correo electrónico" value={responsible.email} />
      </Stack>
    </Box>
  </BlankCard>
);

const StudentInfo = ({ student }: any) => (
  <BlankCard>
    <Box p={3} minHeight={{xs:'auto',md:250}}>
      <SectionTitle icon={<IconSchool size={22} />} title="Estudiante" />
      <Stack spacing={1}>
        <InfoRow label="Cédula" value={student.cedula} />
        <InfoRow 
          label="Nombre completo" 
          value={`${student.name} ${student.lastName1} ${student.lastName2}`} 
        />
        <InfoRow 
          label="Adecuacion" 
          value={
            <CustomChip 
              label={student?.adequacy} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          } 
        />
      </Stack>
    </Box>
  </BlankCard>
);

const SocioeconomicInfo = ({ socioeconomic }: any) => (
  <BlankCard>
    <Box p={3} minHeight={{xs:'auto', md:360}}>
      <SectionTitle icon={<IconReportMoney size={22} />} title="Información Socioeconómica" />
      <Stack spacing={1}>
        <InfoRow 
          label="Miembros del hogar" 
          value={`${socioeconomic.membersCount} personas`} 
        />
        <InfoRow 
          label="Ingreso mensual" 
          value={`₡${socioeconomic.monthlyIncome.toLocaleString()}`} 
        />
        <InfoRow 
          label="Ingreso per cápita" 
          value={`₡${socioeconomic.perCapitaIncome.toLocaleString()}`} 
        />
        <InfoRow label="Tipo de vivienda" value={socioeconomic.housingType} />
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" color="text.secondary">
            Condición de salud:
          </Typography>
          <Chip
            icon={socioeconomic.hasDisease ? <IconX size={16} /> : <IconCheck size={16} />}
            label={socioeconomic.hasDisease ? "Sí presenta" : "No presenta"}
            size="small"
            color={socioeconomic.hasDisease ? "warning" : "success"}
            variant="outlined"
          />
        </Box>
        
        {socioeconomic.hasDisease && socioeconomic.diseaseDescription && (
          <Box 
            mt={1} 
            p={2} 
            sx={{ 
              bgcolor: 'warning.lighter', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'warning.light'
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Descripción:
            </Typography>
            <Typography variant="body2">
              {socioeconomic.diseaseDescription}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  </BlankCard>
);

const AssignScholarship = ({ scholarship }: any) => (
  <BlankCard>
    <Box p={3} minHeight={250}>
      <SectionTitle icon={<IconBook size={22} />} title="Asignación de Beca" />
      
      <Box 
        p={2.5} 
        mb={3}
        sx={{ 
          bgcolor: 'success.lighter', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'success.light'
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Beca de preferencia del solicitante:
        </Typography>
        <Box display="flex" alignItems="center" gap={1.5} mt={1}>
          <Typography variant="h6" fontWeight={600}>
            {scholarship.name}
          </Typography>
          <Chip 
            label={`${scholarship.coverage}% de cobertura`}
            color="success"
            size="small"
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <FormControl fullWidth>
        <InputLabel id="assign-scholarship-label">Seleccionar beca a asignar</InputLabel>
        <Select 
          labelId="assign-scholarship-label" 
          label="Seleccionar beca a asignar"
          defaultValue={scholarship.id}
        >
          <MenuItem value={1}>Beca 100% - Cobertura Total</MenuItem>
          <MenuItem value={2}>Beca 75% - Cobertura Parcial</MenuItem>
          <MenuItem value={3}>Beca Transporte</MenuItem>
        </Select>
      </FormControl>

      <Box mt={3} display="flex" gap={2}>
        <Button 
          variant="contained" 
          fullWidth
          startIcon={<IconCheck size={20} />}
        >
          Asignar
        </Button>
        <Button 
        fullWidth
          variant="outlined" 
          color="error"
          startIcon={<IconX size={20} />}
        >
          Rechazar
        </Button>
      </Box>
    </Box>
  </BlankCard>
);

export default ScholarshipRequestDetails;