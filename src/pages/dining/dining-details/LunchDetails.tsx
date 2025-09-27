import { CardContent, Divider, Grid, Typography } from '@mui/material'
import BlankCard from '@components/shared/BlankCard'
import StatsCard from '@components/Cards/StatsCard'
import PaymentMethodsChart from '@components/Charts/PaymenMethodChart'
import { AttachMoney, CheckCircle, Payment, People } from '@mui/icons-material'
import StudentsTable from './components/StudentsTable'
import type { DiningDetailsDto } from '@/types/dining/dining/dtos/DiningDetailsDto'

const LunchDetails = ({ data }: {data: DiningDetailsDto}) => {

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12}>
                <BlankCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom color="primary">
                            🍽️ Almuerzo
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={6} md={3}>
                                <StatsCard
                                    title="Estudiantes"
                                    value={data?.lunch?.totalStudents}
                                    icon={<People />}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <StatsCard
                                    title="Asistencias"
                                    value={data?.lunch?.totalAssistances}
                                    icon={<CheckCircle />}
                                    color="success"
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <StatsCard
                                    title="Esperado"
                                    value={`₡${data?.lunch?.expectedRevenue || 0}`}
                                    icon={<AttachMoney />}
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <StatsCard
                                    title="Recaudado"
                                    value={`₡${data?.lunch?.totalRevenue || 0}`}
                                    icon={<Payment />}
                                    color="success"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <PaymentMethodsChart
                                    paymentStats={data?.lunch?.paymentStats}
                                    title="Métodos de Pago - Almuerzo"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StudentsTable
                                    students={data?.lunch?.dining.diningStudents}
                                    title="Estudiantes - Almuerzo"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    )
}

export default LunchDetails