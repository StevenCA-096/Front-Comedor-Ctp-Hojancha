import { Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import BlankCard from "@components/shared/BlankCard"
import { Check, Close } from "@mui/icons-material"
import type StudentPaymentInfo from "@/types/dining/dining-student/studentPaymentInfo"

interface ConfirmAssistanceProps {
    studentPaymentData: StudentPaymentInfo
}

const ConfirmAssistance = ({ studentPaymentData }: ConfirmAssistanceProps) => {
    const theme = useTheme()
    const hasPay = studentPaymentData?.hasPay
    const hasAssisted = studentPaymentData?.hasAssisted

    return (
        <BlankCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    boxShadow: 4,
                    background: hasPay && !hasAssisted ? theme.palette.primary.main : theme.palette.error.main,
                    borderRadius: 1,
                    p: 12,
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: 10,
                        background: hasPay && !hasAssisted ? theme.palette.primary.dark : theme.palette.error.dark,
                    }
                }}
            >
                <Typography fontSize={30} fontWeight={'bold'} color={'white'} textAlign={'center'}>
                    {
                        hasPay && !hasAssisted ?
                            <Box>
                                <Check fontSize="large" />
                                <br />
                                Asistencia confirmada
                            </Box>
                            :
                            <Box>
                                <Close fontSize="large" />
                                <br />
                                {!hasPay ? 'No pagó' : 'Ya asistió'}
                            </Box>
                    }
                </Typography>
            </Box>
        </BlankCard>

    )
}

export default ConfirmAssistance