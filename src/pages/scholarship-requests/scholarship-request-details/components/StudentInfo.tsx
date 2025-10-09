import { Box, Stack } from "@mui/material";
import { InfoRow, SectionTitle } from "./SectionParts";
import { IconSchool } from "@tabler/icons-react";
import CustomChip from "@/components/Chip/CustomChip";
import type { Student } from "@/types/student/Student";

const StudentInfo = ({ student }: {student: Student | undefined }) => (
    <Box p={3} minHeight={{xs:'auto',md:250}}>
      <SectionTitle icon={<IconSchool size={22} />} title="Estudiante" />
      <Stack spacing={1}>
        <InfoRow label="Cédula" value={student?.cedula.toString()} />
        <InfoRow 
          label="Nombre completo" 
          value={`${student?.name} ${student?.lastName1} ${student?.lastName2}`} 
        />
        <InfoRow 
          label="Adecuacion" 
          value={
            <CustomChip 
              label={student?.adequacy? student.adequacy : ''} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          } 
        />
      </Stack>
    </Box>
);

export default StudentInfo