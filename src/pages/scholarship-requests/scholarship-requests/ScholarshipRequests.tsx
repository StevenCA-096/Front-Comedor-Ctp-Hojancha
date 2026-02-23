import StatsCard from "@/components/Cards/StatsCard"
import PageContainer from "../../../components/container/page/PageContainer"
import ScholarshipRequestsTable from "./components/ScholarshipRequestsTable"
import { Grid2 } from "@mui/material"
import { Check, Error, Pending } from "@mui/icons-material"
import useScholarshipRequestsList from "@/hooks/api/scholarship-request/queries/useScholarshipRequestsList"
import type { ScholarshipRequestStatus } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"
import useIsMobile from "@/hooks/isMobile/useIsMobile"
import ViewToggleButton, { type ViewMode } from "@/components/Buttons/ViewToggleButton"
import ScholarshipRequestsCards from "./components/ScholarshipRequestsCards"
import { useMemo, useState } from "react"
import ListFilters from "@/components/filters/ListFilters"
import useSearchAndSort from "@/hooks/filters/useSearchAndSort"
import type { ScholarshipRequest } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"

const ScholarshipRequests = () => {
  const isMobile = useIsMobile();
  const { data: scholarshipRequests = [], isLoading, isError } = useScholarshipRequestsList();
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "cards" : "table");

  const sortOptions = useMemo(
    () => [
      { key: "student", label: "Estudiante", getValue: (item: ScholarshipRequest) => `${item.student?.name || ""} ${item.student?.lastName1 || ""}` },
      { key: "status", label: "Estado", getValue: (item: ScholarshipRequest) => item.status },
      { key: "requestDate", label: "Fecha solicitud", getValue: (item: ScholarshipRequest) => new Date(item.requestDate) },
      { key: "year", label: "Ciclo", getValue: (item: ScholarshipRequest) => item.year },
    ],
    [],
  )

  const {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    filteredSortedItems,
  } = useSearchAndSort({
    items: scholarshipRequests,
    searchableText: (item) => JSON.stringify(item),
    sortOptions,
    defaultSortKey: "requestDate",
    defaultSortDirection: "desc",
  })

  const getCountByStatus = (status: ScholarshipRequestStatus) => {
    return scholarshipRequests && scholarshipRequests.length > 0 ? scholarshipRequests?.filter((scholarshipRequest) => scholarshipRequest.status == status)?.length : 0
  }
  
  return (
    <PageContainer
      title={'Solicitudes de beca'}
      action={<ViewToggleButton viewMode={viewMode} onChange={setViewMode} />}
    >
      <Grid2 spacing={2} container>
        <Grid2 container size={{ xs: 12 }} spacing={2}>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="primary" icon={<Check />} title={'Total'} value={scholarshipRequests.length} />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="success" icon={<Check />} title={'Aprobadas'} value={getCountByStatus('Aprobado')} />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="warning" icon={<Pending />} title={'Pendientes'} value={getCountByStatus('Pendiente')} />
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <StatsCard color="error" icon={<Error />} title={'Rechazadas'} value={getCountByStatus('Rechazado')} />
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          {viewMode === "table" ? (
            <ScholarshipRequestsTable />
          ) : (
            <>
              {!!scholarshipRequests.length && (
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
              <ScholarshipRequestsCards
                requests={filteredSortedItems}
                isLoading={isLoading}
                isError={isError}
                itemsPerPage={isMobile ? 4 : 6}
              />
            </>
          )}
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default ScholarshipRequests
