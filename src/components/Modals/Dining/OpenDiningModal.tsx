import { Box, Stack } from "@mui/material"
import CustomTextField from "../../forms/theme-elements/CustomTextField"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import CustomButton from "../../Buttons/CustomButton"
import { Check, Close } from "@mui/icons-material"
import useCreateDiningMutation from "../../../hooks/api/dining/mutations/createDiningMutation"
import { useState } from "react"
import CustomModal from "../CustomModal"
import CustomSelect from "../../forms/theme-elements/CustomSelect"
import toast from "react-hot-toast"
import type { CreateDiningDto, MealTimes } from "@/types/dining/dining/dtos/CreateDiningDto"

const schema = z.object({
    openingDate: z.string().nonempty({ message: 'Indique la fecha' }),
    price: z.preprocess((value) => {
        return Number(value);
    }, z.number().min(1, { message: "Indique un número mayor a 1" })),
    mealTime: z.enum(['Almuerzo', 'Cena'], {
        error: () => ({ message: 'Indique el tiempo de comida' })
    })
})

interface OpenDiningModalProps {
    open: boolean,
    onClose: () => void,
    refetch: () => void
}

const OpenDiningModal = ({ open, onClose, refetch }: OpenDiningModalProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const createDining = useCreateDiningMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        setFocus,
        clearErrors,
        reset
    } = useForm({
        resolver: zodResolver(schema),
        values: {
            price: 100,
            mealTime: "Almuerzo",
            openingDate: ""
        }
    })

    const handleOnSubmit: SubmitHandler<CreateDiningDto> = async (data: CreateDiningDto) => {
        setLoading(true)
        await createDining.mutateAsync(
            { ...data },
            {
                onError: () => {
                    setFocus('mealTime')
                    setError('openingDate', { message: `Ya hay caja de ${data?.mealTime} esta fecha` })
                },
                onSuccess: () => {
                    toast.success('Caja creada exitosamente')
                    refetch()
                    clearErrors()
                    reset()
                    onClose()
                }
            }
        ).finally(() => setLoading(false))
    }

    return (
        <CustomModal open={open} onClose={onClose} title={'Abrir caja'}>
            <Box
                component={'form'}
                onSubmit={handleSubmit(handleOnSubmit)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Stack direction={'column'}>
                    <Box>
                        <CustomTextField
                            register={register}
                            type="date"
                            name={'openingDate'}
                            error={!!errors?.openingDate}
                            errorMessage={errors?.openingDate?.message}
                            label={'Fecha'}
                            externalLabel
                        />
                    </Box>
                    <Box>
                        <CustomTextField
                            register={register}
                            type="number"
                            name={'price'}
                            error={!!errors?.price}
                            errorMessage={errors?.price?.message}
                            label={'Precio'}
                            externalLabel
                            Icon={'₡'}
                        />
                    </Box>
                    <Box>
                        <CustomSelect
                            error={!!errors?.mealTime}
                            errorMessage={errors?.mealTime?.message}
                            options={[
                                { value: "Almuerzo", label: "Almuerzo" },
                                { value: "Cena", label: "Cena" },
                            ]}
                            label={'Hora'}
                            onchange={(e) => setValue('mealTime', e?.target?.value as MealTimes)}
                        />
                    </Box>
                    <Stack direction={'row'} justifyContent={'space-between'} mt={1}>
                        <Box>
                            <CustomButton
                                color={'error'}
                                onClickFn={onClose}
                                icon={<Close />}
                            />
                        </Box>
                        <Box>
                            <CustomButton
                                color={'primary'}
                                type="submit"
                                icon={<Check sx={{color:'white'}}/>}
                                loading={loading}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </CustomModal>
    )
}

export default OpenDiningModal