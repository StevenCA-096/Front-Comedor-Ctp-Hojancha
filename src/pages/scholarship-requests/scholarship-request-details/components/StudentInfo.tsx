import { Grid2 } from "@mui/material";
import { IconSchool } from "@tabler/icons-react";
import type { Student } from "@/types/student/Student";
import GradientCard from "@/components/shared/GradientCard";
import InfoItem from "@/components/shared/InfoItem";

const StudentInfo = ({ student }: {student: Student | undefined }) => (
  <GradientCard icon={<IconSchool />} title="Estudiante" color="secondary">
    <Grid2 spacing={2} container>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Cédula"
          value={student?.cedula.toString()}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Nombre completo"
          value={`${student?.name} ${student?.lastName1} ${student?.lastName2}`} 
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Adecuacion"
          value={student?.adequacy? student.adequacy : ''}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Correo"
          value={student?.personalEmail || 'No registrado'}
        />
      </Grid2>
      <Grid2 size={12}>
        <InfoItem
          color="secondary"
          label="Sexo"
          value={student?.sex || 'No registrado'}
        />
      </Grid2>

    </Grid2>
  </GradientCard>

);

export default StudentInfo