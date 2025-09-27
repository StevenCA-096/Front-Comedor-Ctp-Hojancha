import { Alert, Grid, Tab, Tabs, Typography } from "@mui/material"
import PageContainer from "@components/container/page/PageContainer"
import { getTodayStats } from "@services/dining/diningService"
import DiningsTable from "./components/DiningsTable"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import TodayPaymentsCard from "./components/TodayPaymentsCard"
import TodayAssistancesCard from "./components/TodayAssistancesCard"
import { useQuery } from "@tanstack/react-query"
import { createEmptyMealtimeStats } from "@/types/dining/dining/dtos/MealTimeStatsDto"

const Table = <DiningsTable />

const Dinings = () => {
    const [mealTimeActiveTab, setMealTimeActiveTab] = useState('Almuerzo')

    //Get today stats by mealtime
    const {
        data: todayDining,
        error: todayDiningError,
        isLoading: todayDiningLoading,
        refetch
    } = useQuery({
        queryFn: () => getTodayStats(mealTimeActiveTab),
        queryKey: ['today-dining-stats-' + mealTimeActiveTab], // Incluir mealTimeActiveTab en el queryKey
        retry: false,
        refetchOnWindowFocus: false,
        initialData: createEmptyMealtimeStats()
    })

    // Refetch cuando cambie mealTimeActiveTab
    useEffect(() => {
        refetch()
    }, [mealTimeActiveTab, refetch])


    return (
        <PageContainer title={'Cajas'}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Box height={'50%'}>
                        {Table}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    {
                        todayDiningError ?
                            <Alert severity="error" sx={{mt:4}}>
                                Error al cargar las cajas de hoy
                            </Alert>
                            :
                            <>
                                <Box>
                                    <Typography fontWeight={'bold'} fontSize={20} textAlign={'start'} >
                                        Caja de hoy
                                    </Typography>
                                    <Tabs
                                        variant="fullWidth"
                                        value={mealTimeActiveTab}
                                        onChange={(e, newValue) => setMealTimeActiveTab(newValue)}
                                    >
                                        <Tab value={'Almuerzo'} label="Almuerzo" />
                                        <Tab value={'Cena'} label="Cena" />
                                    </Tabs>
                                </Box>

                                <Box mb={1}>
                                    <TodayPaymentsCard data={todayDining} error={!!todayDiningError} refetch={refetch} />
                                </Box>
                                <Box>
                                    <TodayAssistancesCard data={todayDining} loading={todayDiningLoading} error={!!todayDiningError} />
                                </Box>
                            </>
                    }
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default Dinings