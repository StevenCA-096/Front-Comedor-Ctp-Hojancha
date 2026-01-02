
import type { Responsible } from "@/types/student/Responsible";
import GradientCard from "@/components/shared/GradientCard";
import InfoItem from "@/components/shared/InfoItem";
import { Person } from "@mui/icons-material";
import { Grid2 } from "@mui/material";

const ResponsibleInfo = ({ responsible }: { responsible: Responsible | undefined }) => (
  <GradientCard icon={<Person />} title="Responsable" color="secondary">
    <Grid2 spacing={2} container>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Cédula"
          value={responsible?.cedula.toString() || 'No disponible'}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Nombre completo"
          value={`${responsible?.name} ${responsible?.lastName1}`}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Sexo"
          value={responsible?.sex}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="secondary"
          label="Correo electrónico"
          value={responsible?.email || 'No disponible'}
        />
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
        <InfoItem
          color="secondary"
          label="Correo electrónico"
          value={responsible?.email || 'No disponible'}
        />
      </Grid2>

    </Grid2>
  </GradientCard>
);

export default ResponsibleInfo