import CustomTextField from "@components/forms/theme-elements/CustomTextField"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chip, Grid, Typography } from "@mui/material"
import CustomSelect from "@components/forms/theme-elements/CustomSelect"
import CustomButton from "@components/Buttons/CustomButton"
import { Check, Close } from "@mui/icons-material"
import useCreateDiningStudentMutation from "@/hooks/api/dining-student/mutations/createDiningStudentMutation"
import { useState, type Dispatch, type SetStateAction } from "react"
import BlankCard from "@components/shared/BlankCard"
import { createDiningStudentSchema } from "@/utils/validation-form-schemas/dining_student/createDiningStudentSchema"
import type { DiningStudentFormData } from "@/types/dining/dining-student/dtos/createDiningStudentDto"
import type StudentPaymentInfo from "@/types/dining/dining-student/dtos/studentPaymentInfo"
import type { PaymentMethods } from "@/types/dining/dining-student/entities/DiningStudent"
import successPaymentSound from '@assets/sounds/payment-assistance-register/payment-success.mp3'
import { playSound } from "@/utils/audio/playAudio"

interface ConfirmPaymentProps {
    studentPaymentData: StudentPaymentInfo;
    hasPay: boolean;
    setHasPay: Dispatch<SetStateAction<boolean>>;
}

//this component displays the values for each student payment
//it considers the student cholarship, but the calcs come from the api
const ConfirmPayment = ({ studentPaymentData, hasPay, setHasPay }: ConfirmPaymentProps) => {
    const diningStudentMutation = useCreateDiningStudentMutation()
    const [loading, setLoading] = useState(false)

    const {
        handleSubmit,
        setValue
    } = useForm({
        resolver: zodResolver(createDiningStudentSchema),
        values: {
            amountPaid: studentPaymentData?.amountToPay,
            paymentMethod: 'Efectivo',
        }
    })

    //sends the payment confirmation request
    //once succeded, focus the cedula input for the next register
    const handleConfirmPayment: SubmitHandler<DiningStudentFormData> = async (data: DiningStudentFormData) => {
        console.log({
            ...data,
            diningId: studentPaymentData?.diningId,
            studentCedula: studentPaymentData?.student?.cedula
        })
        setLoading(true)
        await diningStudentMutation.mutateAsync({
            ...data,
            diningId: studentPaymentData?.diningId,
            studentCedula: parseInt(studentPaymentData?.student?.cedula.toString())
        }).finally(() => setLoading(false))
        playSound(successPaymentSound)
        setHasPay(true)

        document.getElementById('cedula-scan')?.focus()
    }

    return (
        <form onSubmit={handleSubmit(handleConfirmPayment)}>
            <BlankCard>
                <Grid container p={4}>
                    <Grid item xs={12} mb={2} textAlign={'center'}>
                        <Typography textAlign={'center'} color={'primary'} fontWeight={'bold'} fontSize={18}>
                            Detalle de pago
                        </Typography>
                        <Chip
                            label={hasPay ? 'Ya pagó' : "Sin pagar"}
                            avatar={hasPay ? <Check sx={{ fill: 'white' }} /> : <Close sx={{ fill: 'white' }} />}
                            color={hasPay ? 'success' : 'error'}
                            size="small"
                            sx={{ fontWeight: 'bold', mt: 1 }}
                        />
                    </Grid>
                    <Grid spacing={2} container item >
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                label={'Precio del almuerzo'}
                                value={studentPaymentData?.total}
                                disabled
                                externalLabel
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                label={'Monto a pagar'}
                                value={studentPaymentData?.amountToPay}
                                disabled
                                externalLabel
                            />
                        </Grid>
                    </Grid>

                    <Grid xs={12} md={12}>
                        <CustomSelect
                            label={'Metodo de pago'}
                            options={[
                                { value: 'Efectivo', label: 'Efectivo' },
                                { value: 'SINPE', label: 'SINPE' },
                            ]}
                            onchange={(e) => setValue('paymentMethod', e.target.value as PaymentMethods)}
                        />

                    </Grid>
                    <Grid xs={12} mt={1}>
                        <CustomButton
                            label={'Pagar'}
                            color={'primary'}
                            fullWidth
                            type="submit"
                            icon={<Check />}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </BlankCard>
        </form>
    )
}

export default ConfirmPayment