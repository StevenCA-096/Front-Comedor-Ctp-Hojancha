import CustomButton from "@/components/Buttons/CustomButton"
import CustomTextField from "@/components/forms/theme-elements/CustomTextField"
import CustomModal from "@/components/Modals/CustomModal"
import useCreateScholarshipAvailability from "@/hooks/api/scholarship-availability/mutations/useCreateScholarshipAvailability"
import useUpdateScholarshipAvailability from "@/hooks/api/scholarship-availability/mutations/useUpdateScholarshipAvailability"
import useScholarshipsList from "@/hooks/api/scholarship/queries/useScholarshipsList"
import type { ScholarshipAvailability } from "@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability"
import { zodResolver } from "@hookform/resolvers/zod"
import { Close, Save } from "@mui/icons-material"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

//Modal props
interface ScholarshipAvailabilityModalProps {
    open: boolean,
    onClose: () => void,
    scholarshipAvailability: ScholarshipAvailability | null
}

//Validation schema
const scholarshipAvailabilitySchema = z.object({
    quota:
        z.preprocess(
            (value) => {
                return Number(value)
            },
            z.number({ message: "Indique el cupo" })
        )
    ,
    year: z.preprocess(
        (value) => {
            return Number(value)
        },
        z.number({ message: "Indique el ciclo" })
    ),
    scholarshipId: z.preprocess(
        (value) => {
            return Number(value)
        },
        z.number({ message: "Indique la beca" })
    ),
})
//Get the schema type, it will be the same of create scholarship dto
type scholarshipAvailabilityType = z.infer<typeof scholarshipAvailabilitySchema>

const ScholarshipAvailabilityModal = ({ onClose, open, scholarshipAvailability }: ScholarshipAvailabilityModalProps) => {
    const [loading, setLoading] = useState(false)
    const isEdit = scholarshipAvailability?.id !=0
    const createMutation = useCreateScholarshipAvailability()
    const updateMutation = useUpdateScholarshipAvailability(scholarshipAvailability?.id || 0)

    const { refetch } = useScholarshipsList()
    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(scholarshipAvailabilitySchema),
        defaultValues: {
            quota: scholarshipAvailability?.quota || 0,
            scholarshipId: scholarshipAvailability?.scholarship?.id || 0,
            year: scholarshipAvailability?.year
        },
        mode: "onBlur"
    })
    console.log(scholarshipAvailability)
    // Reset form cuando cambia el scholarship o se abre/cierra el modal
    useEffect(() => {
        if (open) {
            reset({
                quota: scholarshipAvailability?.quota || 0,
                scholarshipId: scholarshipAvailability?.scholarship?.id || 0,
                year: scholarshipAvailability?.year,
            })
        }
    }, [open, scholarshipAvailability, reset])

    const handleCreate = async (data: scholarshipAvailabilityType) => {
        setLoading(true)
        console.log(data)
        //The hook handles success and errors
        if (isEdit) {
            await updateMutation.mutateAsync(data).finally(() => setLoading(false))
        } else {
            await createMutation.mutateAsync(data).finally(() => setLoading(false))
        }
        await refetch()
        onClose()
    }

    return (
        <CustomModal title={isEdit ? 'Actualizar disponibilidad' : 'Abrir disponibilidad'} open={open} onClose={onClose}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <Box py={3}>
                    <CustomTextField
                        name="quota"
                        error={!!errors.quota}
                        errorMessage={errors?.quota?.message}
                        register={register}
                        externalLabel
                        label="Cupos"
                    />
                    <CustomTextField
                        register={register}
                        name="year"
                        error={!!errors.year}
                        errorMessage={errors?.year?.message}
                        externalLabel
                        label="Ciclo Lectivo"
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

export default ScholarshipAvailabilityModal