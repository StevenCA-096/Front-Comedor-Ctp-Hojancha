import { Box, CircularProgress, Alert } from "@mui/material";
import CustomModal from "@/components/Modals/CustomModal";
import useStudentByCedula from "@/hooks/api/student/queries/useStudentByCedula";
import useIsMobile from "@/hooks/isMobile/useIsMobile";
import StudentReportTabs from "@/pages/reports/student-reports/StudentReportTabs";
import useGetStudentFiles from "@/hooks/files/queries/useGetStudentFiles";

interface StudentReportModalProps {
  open: boolean;
  onClose: () => void;
  cedula: number;
}

const StudentReportModal = ({
  open,
  onClose,
  cedula,
}: StudentReportModalProps) => {
  const isMobile = useIsMobile();
  const {
    data: studentData,
    isLoading: isLoadingStudent,
    error,
  } = useStudentByCedula(cedula);
  const { data: filePaths, isLoading: filesLoading } = useGetStudentFiles(cedula);
  console.log(cedula);
  const renderContent = () => {
    // Loading inicial
    if (isLoadingStudent || filesLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 8,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    // Error al cargar estudiante
    if (error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          Error al cargar la información del estudiante. Por favor, intente
          nuevamente.
        </Alert>
      );
    }

    // No se encontró estudiante
    if (!studentData) {
      return (
        <Alert severity="warning" sx={{ m: 2 }}>
          No se encontró información para la cédula: {cedula}
        </Alert>
      );
    }

    // Todo bien, mostrar tabs
    return (
      <StudentReportTabs filePaths={filePaths || []} studentData={studentData} />
    );
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Información del Estudiante"
      maxWidth="xl"
      fullScreen={isMobile}
    >
      {renderContent()}
    </CustomModal>
  );
};

export default StudentReportModal;
