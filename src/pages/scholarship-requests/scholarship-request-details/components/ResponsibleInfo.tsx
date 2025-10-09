import { Box, Stack } from "@mui/material";
import { InfoRow, SectionTitle } from "./SectionParts";
import { IconUser } from "@tabler/icons-react";
import type { Responsible } from "@/types/student/Responsible";

const ResponsibleInfo = ({ responsible }: {responsible: Responsible | undefined}) => (
    <Box p={3} minHeight={{xs:'100%',md:250}}>
      <SectionTitle icon={<IconUser size={22} />} title="Responsable" />
      <Stack spacing={1}>
        <InfoRow label="Cédula" value={responsible?.cedula.toString()} />
        <InfoRow 
          label="Nombre completo" 
          value={`${responsible?.name} ${responsible?.lastName1}`} 
        />
        <InfoRow label="Sexo" value={responsible?.sex} />
        <InfoRow label="Correo electrónico" value={responsible?.email} />
        <InfoRow label="Ocupación" value={responsible?.occupation} />
      </Stack>
    </Box>
);

export default ResponsibleInfo