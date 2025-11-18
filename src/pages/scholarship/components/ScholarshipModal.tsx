import CustomButton from "@/components/Buttons/CustomButton"
import CustomTextField from "@/components/forms/theme-elements/CustomTextField"
import CustomModal from "@/components/Modals/CustomModal"
import useCreateScholarship from "@/hooks/api/scholarship/mutations/useCreateScholarship"
import useUpdateScholarship from "@/hooks/api/scholarship/mutations/useUpdateScholarship"
import useScholarshipsList from "@/hooks/api/scholarship/queries/useScholarshipsList"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"
import { zodResolver } from "@hookform/resolvers/zod"
import { Close, Save } from "@mui/icons-material"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

//Modal props
interface ScholarshipModalProps {
  open: boolean,
  onClose: () => void,
  scholarship: Scholarship | null
}

//Validation schema
const scholarshipSchema = z.object({
  name: z.string({ message: "Indique el nombre" }).min(3, { message: "Ingrese al menos 3 caracteres" }),
  coverage: z.preprocess(
    (value) => {
      return Number(value)
    },
    z.number({ message: "Indique la cobertura" }),
  ),
})
//Get the schema type, it will be the same of create scholarship dto
type StudentInfoSchemaType = z.infer<typeof scholarshipSchema>

const ScholarshipModal = ({ onClose, open, scholarship }: ScholarshipModalProps) => {
  const [loading, setLoading] = useState(false)
  const isEdit = !!scholarship
  const CreateScholarshipMutation = useCreateScholarship()
  const updateMutation = useUpdateScholarship(scholarship?.id || 0)
  const { refetch } = useScholarshipsList()
  const {
    formState: { errors },
    register,
    handleSubmit, 
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      coverage: scholarship?.coverage || 0,
      name: scholarship?.name || ''
    },
    mode:"onBlur"
  })

  // Reset form cuando cambia el scholarship o se abre/cierra el modal
  useEffect(() => {
    if (open) {
      reset({
        name: scholarship?.name || '',
        coverage: scholarship?.coverage || 0
      })
    }
  }, [open, scholarship, reset])

  const handleCreate = async (data: StudentInfoSchemaType) => {
    setLoading(true)
    //The hook handles success and errors
    if (isEdit) {
      await updateMutation.mutateAsync(data)
    } else {
      await CreateScholarshipMutation.mutateAsync(data)
    }
    await refetch()
    setLoading(false)
    onClose()
  }

  return (
    <CustomModal title={isEdit ? 'Actualizar beca' : 'Crear beca'} open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Box py={3}>
          <CustomTextField
            name="name"
            error={!!errors.name}
            errorMessage={errors?.name?.message}
            register={register}
            externalLabel
            label="Nombre"
          />
          <CustomTextField
            register={register}
            name="coverage"
            error={!!errors.coverage}
            errorMessage={errors?.coverage?.message}
            externalLabel
            label="Cobertura (Porcentaje %)"
            type="number"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <CustomButton
            loading={loading}
            type="submit"
            icon={<Save sx
              ={{ color: "white" }} />}
          />
          <CustomButton
            onClickFn={onClose}
            color="error"
            icon={<Close sx={{ color: "white" }} />}
          />
        </Box>
      </form>
    </CustomModal>
  )
}

export default ScholarshipModal