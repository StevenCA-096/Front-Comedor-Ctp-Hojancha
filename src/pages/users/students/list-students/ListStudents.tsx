import PageContainer from "@/components/container/page/PageContainer";
import StudentsTable from "./components/StudentsTable";
import useModal from "@/hooks/useModal/useModal";
import StudentReportModal from "@/components/Modals/reports/StudentReportModal";
import type { Student } from "@/types/student/Student";
import { useMemo, useState } from "react";
import useIsMobile from "@/hooks/isMobile/useIsMobile";
import useGetStudents from "@/hooks/api/student/queries/useGetStudents";
import StudentsCards from "./components/StudentsCards";
import ListFilters from "@/components/filters/ListFilters";
import useSearchAndSort from "@/hooks/filters/useSearchAndSort";
import type { User } from "@/types/common/user/user";
import ViewToggleButton, {
  type ViewMode,
} from "@/components/Buttons/ViewToggleButton";
import { Box } from "@mui/material";
import CustomButton from "@/components/Buttons/CustomButton";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconFileImport } from "@tabler/icons-react";

const ListStudents = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    data: students = [],
    isLoading,
    isFetching,
    isError,
  } = useGetStudents();
  const { handleClose, open, openModal } = useModal();
  const [selectedCedula, setSelectedCedula] = useState<Student["cedula"]>(0);
  const [viewMode, setViewMode] = useState<ViewMode>(
    isMobile ? "cards" : "table",
  );
  const sortOptions = useMemo(
    () => [
      { key: "dni", label: "Cedula", getValue: (item: User) => item.dni },
      { key: "email", label: "Email", getValue: (item: User) => item.email },
      {
        key: "createdAt",
        label: "Fecha creacion",
        getValue: (item: User) => new Date(item.createdAt),
      },
      { key: "status", label: "Estado", getValue: (item: User) => item.status },
    ],
    [],
  );

  const {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filteredSortedItems,
  } = useSearchAndSort({
    items: students,
    searchableText: (item) => JSON.stringify(item),
    sortOptions,
    defaultSortKey: "dni",
  });

  const handleOpen = (cedula: Student["cedula"]) => {
    setSelectedCedula(cedula);
    openModal();
  };

  return (
    <PageContainer
      title="Estudiantes"
      description="Lista de estudiantes registrados en el sistema"
      action={<ViewToggleButton viewMode={viewMode} onChange={setViewMode} />}
    >
      <Box my={2} gap={2} sx={{display:"flex", flexDirection:"row", alignContent:"center"}}>
        <Box>
          <CustomButton
            onClickFn={() => navigate("create")}
            label="Crear"
            icon={<Add />}
          />
        </Box>
        <Box>
          <CustomButton
            onClickFn={() => navigate("import")}
            label="importar"
            icon={<IconFileImport />}
          />
        </Box>
      </Box>
      {viewMode === "cards" && (
        <ListFilters
          search={search}
          onSearchChange={setSearch}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          sortDirection={sortDirection}
          onSortDirectionChange={setSortDirection}
          sortOptions={sortOptions}
          defaultExpanded={!isMobile}
        />
      )}
      {viewMode === "table" ? (
        <StudentsTable
          students={students}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          handleOpen={handleOpen}
        />
      ) : (
        <StudentsCards
          students={filteredSortedItems}
          isLoading={isLoading}
          isError={isError}
          onOpen={handleOpen}
          itemsPerPage={isMobile ? 4 : 6}
        />
      )}
      <StudentReportModal
        cedula={selectedCedula}
        onClose={handleClose}
        open={open}
      />
    </PageContainer>
  );
};

export default ListStudents;
