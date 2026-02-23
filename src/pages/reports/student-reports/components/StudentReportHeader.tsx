import CustomChip from "@/components/Chip/CustomChip";
import type { StudentReportDto } from "@/types/student/dto/student-report.dto";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import SetActiveButton from "./SetActiveButton";
import GenerateCarnetButton from "./GenerateCarnetButton";

interface StudentReportHeaderProps {
  studentData: StudentReportDto;
  filePaths: string[];
}

const StudentReportHeader = ({
  studentData,
  filePaths,
}: StudentReportHeaderProps) => {
  //For carnet generation

  const getStudentPhoto = (): string => {
    const photoFile = filePaths?.find((file) =>
      file.includes("Foto_Tamaño_Pasaporte")
    );
    return photoFile || "https://via.placeholder.com/200";
  };
  console.log(filePaths)

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar
          src={getStudentPhoto()}
          sx={{
            width: 160,
            height: 160,
            border: "4px solid",
            borderColor: "primary.main",
            boxShadow: 3,
          }}
        />
        <Chip
          label={studentData.estado === 1 ? "Activo" : "De baja"}
          color={studentData.estado === 1 ? "success" : "error"}
          size="medium"
        />
      </Box>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        {studentData.name} {studentData.lastName1} {studentData.lastName2}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Cédula: {studentData.cedula}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
        <CustomChip
          color="primary"
          label={`${studentData.grade} - ${studentData.sectionName || ""}`}
        />
        <CustomChip
          color="primary"
          label={studentData.areaName || "Sin Sección"}
        />
      </Box>
      <Box display="flex" gap={2}>
        <SetActiveButton
          id={studentData.id}
          isActive={studentData.estado === 1}
        />
        <GenerateCarnetButton studentData={studentData} />
      </Box>
    </Box>
  );
};

export default StudentReportHeader;
