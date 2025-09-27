import { Stack, Typography, Avatar, Fab, Chip, useTheme, Skeleton } from '@mui/material';
import { IconCash, IconTransfer } from '@tabler/icons-react';
import DashboardCard from '@components/shared/DashboardCard';
import { useDashboardContext } from '@context/DashboardContext/DashboardContext';
import { formatDateWithDays } from '@utils/date/format-date';
import { Payment } from '@mui/icons-material';

const StudentPaymentsCard = () => {
  const { todayData, todayDataLoading } = useDashboardContext()
  const theme = useTheme()

  return (
    <DashboardCard
      title="Pagos registrados"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }} >
          <Payment width={24} />
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
          <>
            <Typography variant="h3" fontWeight="700" mt="-20px">
              {todayData?.totalStudents} Pago{todayData?.totalStudents == 1 ? '' : 's'}
            </Typography>
            <Stack direction="row" spacing={1} my={1} alignItems="center">
              <Avatar sx={{ width: 27, height: 27, background: '#13DEB9' }} >
                ₡
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                {todayData?.totalRevenue}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Recaudados
              </Typography>
            </Stack>
            <Stack mt={3} direction="column">
              <Stack direction={'row'} spacing={1} mb={1}>
                <Chip
                  variant='filled'
                  avatar={<IconCash color='white' />}
                  color='success'
                  label={`${todayData?.paymentStats?.Efectivo || 0} Efectivo`}
                />
                <Chip
                  variant='filled'
                  avatar={<IconTransfer color='white' />}
                  color='info'
                  label={`${todayData?.paymentStats?.SINPE || 0} SINPE`}
                />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{ width: 9, height: 9, bgcolor: theme.palette.primary.main, svg: { display: 'none' } }}
                ></Avatar>
                <Typography variant="subtitle2" fontSize={15} color="textSecondary">
                  {formatDateWithDays(new Date())}
                </Typography>
              </Stack>
            </Stack>
          </>
      }      
    </DashboardCard>
  );
};

export default StudentPaymentsCard;
