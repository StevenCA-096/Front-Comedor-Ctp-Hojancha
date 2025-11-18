import PageContainer from "@/components/container/page/PageContainer"
import useScholarshipsList from "@/hooks/api/scholarship/queries/useScholarshipsList"
import ScholarshipCard from "./components/ScholarshipCard"
import { Grid2 } from "@mui/material"
import CustomButton from "@/components/Buttons/CustomButton"
import { Add } from "@mui/icons-material"
import { useState } from "react"
import ScholarshipModal from "./components/ScholarshipModal"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"
import type { ScholarshipAvailability } from "@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability"
import ScholarshipAvailabilityModal from "./components/ScholarshipAvailabilityModal"

const Scholarships = () => {
  const { data } = useScholarshipsList()
  const [openCreateScholarshipModal, setOpenCreateScholarshipModal] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [openScholarshipAvailability, setOpenScholarshipAvailability] = useState(false)
  const [selectedAvailability, setSelectedAvailability] = useState<ScholarshipAvailability | null>(null)

  return (
    <PageContainer
      title="Becas"
      description="Gestión del catalogo de becas"
      action={
        <CustomButton
          onClickFn={() => setOpenCreateScholarshipModal(true)}
          icon={<Add sx={{ color: "white" }} />}
        />
      }
    >

      <Grid2 container spacing={3}>
        {data?.map((scholarship) =>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <ScholarshipCard
              setScholarshipAvailabilityOpen={setOpenScholarshipAvailability}
              setScholarshipAvailability={setSelectedAvailability}
              setScholarship={setSelectedScholarship}
              scholarship={scholarship}
            />
          </Grid2>
        )}
      </Grid2>
      <ScholarshipModal
        scholarship={selectedScholarship}
        onClose={() => {
          setOpenCreateScholarshipModal(false);
          setSelectedScholarship(null)
        }}
        open={openCreateScholarshipModal || !!selectedScholarship}
      />
      <ScholarshipAvailabilityModal
        scholarshipAvailability={selectedAvailability}
        onClose={() => {setSelectedAvailability(null); setOpenScholarshipAvailability(false)}}
        open={openScholarshipAvailability}

      />
    </PageContainer>
  )
}

export default Scholarships