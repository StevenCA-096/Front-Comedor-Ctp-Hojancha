import { Grid, Box } from '@mui/material';
import PageContainer from '@components/container/page/PageContainer';

// components
import AssistanceOverview from './components/AssistanceOverview';
import StudentAssistancesCard from './components/StudentAssistancesCard';
import StudentPaymentsCard from './components/StudentPaymentsCard';
import { getTodayStats } from '@/services/dining/diningService';
import { DashboardContext } from '@context/DashboardContext/DashboardContext';
import { getDasboardData } from '@/services/dining-student/diningStudentService';
import { useState } from 'react';
import StatsCard from '@components/Cards/StatsCard';
import { IconToolsKitchen, IconUserStar } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { createEmptyMealtimeStats } from '@/types/dining/dining/dtos/MealTimeStatsDto';
import { useDiningList } from '@/hooks/api/dining/queries/useDiningList';
import useScholarshipRequestsList from '@/hooks/api/scholarship-request/queries/useScholarshipRequestsList';
import type { ScholarshipRequestStatus } from '@/types/scholarship/scholarship_request/entities/ScholarshipRequest';
import useActiveScholarshipStudentsByYear from '@/hooks/api/scholarship-request/queries/useActiveScholarshipStudentsByYear';
import { PendingActions, School } from '@mui/icons-material';
import useStudentCount from '@/hooks/api/student/mutations/useStudentCount';

const Dashboard = () => {
  const [mealTime, setMealTime] = useState('Almuerzo');

  //Data fort the chart
  const {
    data: mainChartData,
    isLoading: mainChartDataLoading } = useQuery({
      queryFn: getDasboardData,
      queryKey: ['today-dining-stats'],
      retry: false,
      refetchOnWindowFocus: false
    })

  //Data for the cards of today stats
  const {
    data: todayData,
    error: todayDataError,
    isLoading: todayDataLoading } = useQuery({
      queryFn: () => getTodayStats(mealTime),
      queryKey: ['today-dining-stats', mealTime], // Incluir mealTimeActiveTab en el queryKey
      retry: false,
      refetchOnWindowFocus: false
    })

  //Data for the stats card at the top
  const { data: dinings } = useDiningList()
  const { data: studentCount } = useStudentCount()
  const { data: scholarshipRequests = [] } = useScholarshipRequestsList();
  const { data: scholarshipRequestsForThisYear } = useActiveScholarshipStudentsByYear(new Date().getFullYear())

  const getCountByStatus = (status: ScholarshipRequestStatus) => {
    return scholarshipRequests && scholarshipRequests.length > 0 ? scholarshipRequests?.filter((scholarshipRequest) => scholarshipRequest.status == status)?.length : 0
  }

  return (
    <DashboardContext.Provider
      value={{
        todayData: todayData ? todayData : createEmptyMealtimeStats(),
        error: todayDataError,
        todayDataLoading
      }}
    >
      <PageContainer title="Dashboard" >
        <Box>
          <Grid container spacing={2}>
            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} md={3}>
                <StatsCard icon={<School />} title={'Total de estudiantes'} value={studentCount} color='primary' />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatsCard icon={<IconUserStar />} title={'Estudiantes becados'} value={scholarshipRequestsForThisYear?.length || 0} color='success' />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatsCard icon={<PendingActions />} title={'Solicitudes de beca pendientes'} value={getCountByStatus('Pendiente') || 0} color='warning' />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatsCard icon={<IconToolsKitchen />} title={'Total de servicios'} value={dinings?.length || 0} color='info' />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8}>
              <AssistanceOverview
                mainChartData={mainChartData}
                mealTime={mealTime}
                setMealTime={setMealTime}
                mainChartDataLoading={mainChartDataLoading}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StudentPaymentsCard />
                </Grid>
                <Grid item xs={12}>
                  <StudentAssistancesCard />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} lg={4}>
              <RecentPayments />
            </Grid>
            <Grid item xs={12} lg={8}>
              <RecentAssistances />
            </Grid> */}
          </Grid>
        </Box>
      </PageContainer>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
