import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Chip, 
    Grid2, 
    Typography, 
    alpha, 
    useTheme, 
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl
} from "@mui/material";
import CustomButton from "@components/Buttons/CustomButton";
import { Check, Close, Payment } from "@mui/icons-material";
import useCreateDiningStudentMutation from "@/hooks/api/dining-student/mutations/createDiningStudentMutation";
import { useState, type Dispatch, type SetStateAction } from "react";
import BlankCard from "@components/shared/BlankCard";
import { createDiningStudentSchema } from "@/utils/validation-form-schemas/dining_student/createDiningStudentSchema";
import type { DiningStudentFormData } from "@/types/dining/dining-student/dtos/createDiningStudentDto";
import type StudentPaymentInfo from "@/types/dining/dining-student/dtos/studentPaymentInfo";
import type { PaymentMethods } from "@/types/dining/dining-student/entities/DiningStudent";
import successPaymentSound from '@assets/sounds/payment-assistance-register/payment-success.mp3';
import { playSound } from "@/utils/audio/playAudio";
import { Box, Stack } from "@mui/system";

interface ConfirmPaymentProps {
    studentPaymentData: StudentPaymentInfo;
    hasPay: boolean;
    setHasPay: Dispatch<SetStateAction<boolean>>;
}

const ConfirmPayment = ({ studentPaymentData, hasPay, setHasPay }: ConfirmPaymentProps) => {
    const theme = useTheme();
    const diningStudentMutation = useCreateDiningStudentMutation();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>('Efectivo');

    const {
        handleSubmit,
        setValue
    } = useForm({
        resolver: zodResolver(createDiningStudentSchema),
        values: {
            amountPaid: studentPaymentData?.amountToPay,
            paymentMethod: 'Efectivo',
        }
    });

    const handleConfirmPayment: SubmitHandler<DiningStudentFormData> = async (data: DiningStudentFormData) => {
        console.log({
            ...data,
            diningId: studentPaymentData?.diningId,
            studentCedula: studentPaymentData?.student?.cedula
        });
        setLoading(true);
        await diningStudentMutation.mutateAsync({
            ...data,
            diningId: studentPaymentData?.diningId,
            studentCedula: parseInt(studentPaymentData?.student?.cedula.toString())
        }).finally(() => setLoading(false));
        playSound(successPaymentSound);
        setHasPay(true);

        document.getElementById('cedula-scan')?.focus();
    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const method = event.target.value as PaymentMethods;
        setPaymentMethod(method);
        setValue('paymentMethod', method);
    };

    return (
        <form onSubmit={handleSubmit(handleConfirmPayment)}>
            <BlankCard>
                {/* Header con estado de pago */}
                <Box
                    sx={{
                        background: hasPay 
                            ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`
                            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        p: 3,
                        textAlign: 'center'
                    }}
                >
                    <Stack spacing={1.5} alignItems="center">
                        <Payment sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                        <Typography variant="h5" fontWeight={600}>
                            Detalle de Pago
                        </Typography>
                        <Chip
                            icon={hasPay ? <Check sx={{ fontSize: 18 }} /> : <Close sx={{ fontSize: 18 }} />}
                            label={hasPay ? 'Pagado' : 'Pendiente de pago'}
                            color={hasPay ? 'success' : 'warning'}
                            sx={{ 
                                fontWeight: 600,
                                px: 2,
                                height: 32
                            }}
                        />
                    </Stack>
                </Box>

                {/* Contenido */}
                <Box p={3}>
                    <Typography 
                        variant="overline" 
                        color="text.secondary" 
                        fontWeight={600}
                        letterSpacing={1}
                        mb={2}
                        display="block"
                    >
                        Resumen de Costos
                    </Typography>

                    <Grid2 container spacing={2} mb={3}>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: alpha(theme.palette.info.main, 0.05),
                                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                                }}
                            >
                                <Typography 
                                    variant="caption" 
                                    color="text.secondary" 
                                    fontWeight={600}
                                    display="block"
                                    mb={0.5}
                                >
                                    Precio del Almuerzo
                                </Typography>
                                <Typography variant="h4" fontWeight={700} color="info.main">
                                    ₡{studentPaymentData?.total}
                                </Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: alpha(theme.palette.success.main, 0.05),
                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                }}
                            >
                                <Typography 
                                    variant="caption" 
                                    color="text.secondary" 
                                    fontWeight={600}
                                    display="block"
                                    mb={0.5}
                                >
                                    Monto a Pagar
                                </Typography>
                                <Typography variant="h4" fontWeight={700} color="success.main">
                                    ₡{studentPaymentData?.amountToPay}
                                </Typography>
                            </Box>
                        </Grid2>
                    </Grid2>

                    <Divider sx={{ my: 2 }} />

                    <Typography 
                        variant="overline" 
                        color="text.secondary" 
                        fontWeight={600}
                        letterSpacing={1}
                        mb={2}
                        display="block"
                    >
                        Método de Pago
                    </Typography>

                    <Box
                        sx={{
                            p: 2.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.03),
                            border: `1px solid ${theme.palette.divider}`,
                            mb: 3
                        }}
                    >
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                row
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                                sx={{ gap: 2 }}
                            >
                                <FormControlLabel
                                    value="Efectivo"
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography fontSize="1.2rem">💵</Typography>
                                            <Typography fontWeight={500}>Efectivo</Typography>
                                        </Box>
                                    }
                                    sx={{
                                        flex: 1,
                                        m: 0,
                                        p: 1.5,
                                        borderRadius: 1.5,
                                        border: `2px solid ${paymentMethod === 'Efectivo' ? theme.palette.primary.main : 'transparent'}`,
                                        bgcolor: paymentMethod === 'Efectivo' ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    value="SINPE"
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography fontSize="1.2rem">📱</Typography>
                                            <Typography fontWeight={500}>SINPE Móvil</Typography>
                                        </Box>
                                    }
                                    sx={{
                                        flex: 1,
                                        m: 0,
                                        p: 1.5,
                                        borderRadius: 1.5,
                                        border: `2px solid ${paymentMethod === 'SINPE' ? theme.palette.primary.main : 'transparent'}`,
                                        bgcolor: paymentMethod === 'SINPE' ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                        }
                                    }}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <CustomButton
                        label={hasPay ? 'Ya Pagado' : 'Confirmar Pago'}
                        color={hasPay ? 'success' : 'primary'}
                        fullWidth
                        type="submit"
                        icon={<Check />}
                        loading={loading}
                        disabled={hasPay}
                        sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            boxShadow: hasPay ? 'none' : theme.shadows[3],
                            '&:hover': {
                                boxShadow: hasPay ? 'none' : theme.shadows[6],
                            }
                        }}
                    />
                </Box>
            </BlankCard>
        </form>
    );
};

export default ConfirmPayment;