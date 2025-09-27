import PageContainer from "@components/container/page/PageContainer"
import { CalendarMonth, AttachMoney, People, CheckCircle, Payment } from "@mui/icons-material"
import {
    Chip,
    Grid,
    Typography,
    CardContent,
    Divider,
    Alert,
    AlertTitle
} from "@mui/material"
import { formatDateStringWithDays } from "@utils/date/format-date"
import { useParams } from "react-router"
import LoadingScreen from "@components/LoadingScreen/LoadingScreen"
import BlankCard from "@components/shared/BlankCard"
import ComparisonChart from "./components/ComparisonChart"
import LunchDetails from "./LunchDetails"
import DinnerDetails from "./DinnerDetails"
import PaymentMethodsChart from "@components/Charts/PaymenMethodChart"
import StatsCard from "@components/Cards/StatsCard"
import { useDiningDetails } from "@/hooks/api/dining/queries/useDiningDetails"
import { createEmptyMealtimeStats } from "@/types/dining/dining/dtos/MealTimeStatsDto"

const DiningDetails = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError, error } = useDiningDetails(
        id ? parseInt(id) : 0,
        { enabled: !!id && !isNaN(parseInt(id)) } // Only runs if valid
    );
    
    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError || !data) {
        return (
            <PageContainer title="Detalle de caja" showBackButton>
                <Alert variant="filled" severity={error?.status == 404 ? 'warning' : 'error'}>
                    <AlertTitle>
                        {
                            error?.status == 404 ?
                                `No se encontro registro con ID: ${id}`
                                :
                                'Error al cargar los datos'
                        }
                    </AlertTitle>
                </Alert>
            </PageContainer>
        )
    }

    return (
        <PageContainer
            showBackButton
            title={'Detalles de caja'}
        >
            {/* Estadísticas Combinadas */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <BlankCard>
                        <CardContent>
                            <Typography variant="h5" gutterBottom color="primary">
                                📊 Resumen General del Día
                                <Chip
                                    label={
                                        data?.lunch?.dining?.openingDate ?
                                            formatDateStringWithDays(data.lunch.dining.openingDate) : ""
                                    }
                                    avatar={<CalendarMonth />}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ p: 1, ml: 1 }}
                                />
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={6} md={3}>
                                    <StatsCard
                                        title="Total Estudiantes"
                                        value={data.combined.totalStudents}
                                        icon={<People />}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <StatsCard
                                        title="Total Asistencias"
                                        value={data.combined.totalAssistances}
                                        icon={<CheckCircle />}
                                        color="success"
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <StatsCard
                                        title="Ingresos Esperados"
                                        value={`₡${data.combined.expectedRevenue || 0}`}
                                        icon={<AttachMoney />}
                                        color="warning"
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <StatsCard
                                        title="Ingresos Reales"
                                        value={`₡${data.combined.totalRevenue.toLocaleString()}`}
                                        icon={<Payment />}
                                        color="success"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </BlankCard>
                </Grid>
            </Grid>

            {/* Gráficos */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <PaymentMethodsChart
                        paymentStats={data.combined.paymentStats}
                        title="Métodos de Pago - Total del Día"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ComparisonChart
                        lunchData={data?.lunch ? data.lunch : createEmptyMealtimeStats()}
                        dinnerData={data?.dinner ? data.dinner : createEmptyMealtimeStats()}
                    />
                </Grid>
            </Grid>

            {/* Sección Almuerzo */}
            <LunchDetails data={data} />

            {/* Sección Cena */}
            <DinnerDetails data={data} />
        </PageContainer>
    )
}

export default DiningDetails