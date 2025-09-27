import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Fab, Skeleton } from '@mui/material';

import DashboardCard from '@components/shared/DashboardCard';
import { Check } from '@mui/icons-material';
import { useDashboardContext } from '@context/DashboardContext/DashboardContext';
import { IconUsers } from '@tabler/icons-react';
import { formatDateWithDays } from '@utils/date/format-date';

const StudentAssistancesCard = () => {
  const theme = useTheme();
  const { todayData, todayDataLoading } = useDashboardContext()

  return (
    <DashboardCard
      title="Asistencias confirmadas"
      action={
        <Fab color="primary" size="medium" sx={{ color: '#ffffff' }} >
          <Check width={24} />
        </Fab>
      }
    >
      {
          todayDataLoading ?
          <Stack spacing={2}>
            <Skeleton height={30}/>
            <Skeleton height={30}/>
            <Skeleton height={30}/>
          </Stack> 
          :
          todayData && 
          <Grid container spacing={3}>
            {/* column */}
            <Grid item xs={7} sm={9}>
              <Typography variant="h3" fontWeight="700">
                {todayData?.totalAssistances} Asistencia{todayData?.totalAssistances > 1 ? 's' : ''}
              </Typography>
              <Stack direction="row" spacing={1} my={1} alignItems="center">
                <Avatar sx={{ width: 27, height: 27, background: theme.palette.primary.main }} >
                  <IconUsers />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600">
                  {(todayData?.totalStudents - todayData?.totalAssistances) || 0}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Pendientes
                </Typography>
              </Stack>
              <Stack mt={3} direction="row">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    sx={{ width: 9, height: 9, bgcolor: theme.palette.primary.main, svg: { display: 'none' } }}
                  />
                  <Typography variant="subtitle2" fontSize={15} color="textSecondary">
                    {formatDateWithDays(new Date())}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

          </Grid>
      }

    </DashboardCard>
  );
};

export default StudentAssistancesCard;
