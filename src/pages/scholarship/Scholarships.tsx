import EmptyState from "@/components/EmptyState/EmptyState";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ViewToggleButton, { type ViewMode } from "@/components/Buttons/ViewToggleButton";
import PageContainer from "@/components/container/page/PageContainer";
import useScholarshipsList from "@/hooks/api/scholarship/queries/useScholarshipsList";
import useIsMobile from "@/hooks/isMobile/useIsMobile";
import ScholarshipCard from "./components/ScholarshipCard";
import { Box, Grid2 } from "@mui/material";
import CustomButton from "@/components/Buttons/CustomButton";
import { Add } from "@mui/icons-material";
import { useMemo, useState } from "react";
import ScholarshipModal from "./components/ScholarshipModal";
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity";
import type { ScholarshipAvailability } from "@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability";
import ScholarshipAvailabilityModal from "./components/ScholarshipAvailabilityModal";
import ScholarshipsTable from "./components/ScholarshipsTable";
import useSearchAndSort from "@/hooks/filters/useSearchAndSort";
import ListFilters from "@/components/filters/ListFilters";

const Scholarships = () => {
  const isMobile = useIsMobile();
  const { data = [], isLoading, isError, isFetching } = useScholarshipsList();
  const [openCreateScholarshipModal, setOpenCreateScholarshipModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [openScholarshipAvailability, setOpenScholarshipAvailability] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<ScholarshipAvailability | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "cards" : "table");

  const sortOptions = useMemo(
    () => [
      { key: "name", label: "Nombre", getValue: (item: Scholarship) => item.name },
      { key: "coverage", label: "Cobertura", getValue: (item: Scholarship) => item.coverage },
      {
        key: "quotaCurrentYear",
        label: `Cupos ${new Date().getFullYear()}`,
        getValue: (item: Scholarship) =>
          item.scholarship_availabilities?.find((sa) => sa.year === new Date().getFullYear())?.quota ?? 0,
      },
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
    items: data,
    searchableText: (item) => JSON.stringify(item),
    sortOptions,
    defaultSortKey: "name",
  });

  const handleAvailabilityClick = (scholarship: Scholarship, year: number) => {
    const found = scholarship.scholarship_availabilities?.find((item) => item.year === year);
    if (found) {
      setSelectedAvailability({ ...found, scholarship });
      setOpenScholarshipAvailability(true);
      return;
    }

    setOpenScholarshipAvailability(true);
    setSelectedAvailability({ id: 0, quota: 0, year, scholarship });
  };

  return (
    <PageContainer
      title="Becas"
      description="Gestion del catalogo de becas"
      action={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CustomButton
            onClickFn={() => setOpenCreateScholarshipModal(true)}
            icon={<Add sx={{ color: "white" }} />}
          />
          <ViewToggleButton viewMode={viewMode} onChange={setViewMode} />
        </Box>
      }
    >
      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <EmptyState text="No se pudieron cargar las becas" hideButton />
      ) : data.length === 0 ? (
        <EmptyState text="No hay becas registradas" hideButton />
      ) : viewMode === "table" ? (
        <ScholarshipsTable
          scholarships={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          onEdit={setSelectedScholarship}
          onAvailability={handleAvailabilityClick}
        />
      ) : (
        <>
          {!!data.length && (
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
          <Grid2 container spacing={3}>
            {filteredSortedItems.map((scholarship) => (
              <Grid2 key={scholarship.id} size={{ xs: 12, md: 4 }}>
                <ScholarshipCard
                  setScholarshipAvailabilityOpen={setOpenScholarshipAvailability}
                  setScholarshipAvailability={setSelectedAvailability}
                  setScholarship={setSelectedScholarship}
                  scholarship={scholarship}
                />
              </Grid2>
            ))}
          </Grid2>
        </>
      )}

      <ScholarshipModal
        scholarship={selectedScholarship}
        onClose={() => {
          setOpenCreateScholarshipModal(false);
          setSelectedScholarship(null);
        }}
        open={openCreateScholarshipModal || !!selectedScholarship}
      />
      <ScholarshipAvailabilityModal
        scholarshipAvailability={selectedAvailability}
        onClose={() => {
          setSelectedAvailability(null);
          setOpenScholarshipAvailability(false);
        }}
        open={openScholarshipAvailability}
      />
    </PageContainer>
  );
};

export default Scholarships;
