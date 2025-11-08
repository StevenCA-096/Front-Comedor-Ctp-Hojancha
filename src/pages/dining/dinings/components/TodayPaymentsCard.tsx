import { Stack, Typography, Avatar, Fab, Tooltip, useTheme, Skeleton } from '@mui/material';
import { IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@components/shared/DashboardCard';
import { formatDateStringWithDays } from '@utils/date/format-date';
import { useState } from 'react';
import OpenDiningModal from '@components/Modals/Dining/OpenDiningModal';
import { useNavigate } from 'react-router';
import type { TodayPaymentsCardProps } from '../types/TodayPaymentsCardProps';

const TodayPaymentsCard = ({ data, error, refetch, loading }: TodayPaymentsCardProps) => {
  const theme = useTheme()
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  
  const handleContinue = () => {
    if (error) {
      return setOpenModal(true)
    }
    navigate(`/register-dining-payment/diningId/${data?.dining?.id}`)
  }

  return (
    <DashboardCard
      title="Registrar pago"
      action={
        <Tooltip title="Registrar pago">
          <Fab color="secondary" size="medium" sx={{ color: '#ffffff', cursor: 'pointer' }} onClick={handleContinue}>
            <IconCurrencyDollar width={24} />
          </Fab>
        </Tooltip>
      }
    >
      {
        loading ?
          <Stack>
            <Skeleton height={30} width='100%' />
            <Skeleton height={30} width='100%' />
            <Skeleton height={30} width='100%' />
          </Stack>
          :
          <>
            <Typography variant="h3" fontWeight="700" mt="-20px">
              {data?.totalStudents} Pago{data?.totalStudents == 1 ? '' : 's'}
            </Typography>
            <Stack direction="row" spacing={1} my={1} alignItems="center">
              <Avatar sx={{ width: 27, height: 27, background: '#13DEB9' }} >
                ₡
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                {data?.totalRevenue}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Recaudados
              </Typography>
            </Stack>
            <Stack mt={3} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{ width: 9, height: 9, bgcolor: theme.palette.primary.main, svg: { display: 'none' } }}
                />
                <Typography variant="subtitle2" fontSize={15} color="textSecondary">
                  {
                    data?.dining?.openingDate ?
                      formatDateStringWithDays(data?.dining?.openingDate as string)
                      :
                      'No abierta'
                  }
                </Typography>
              </Stack>
            </Stack>
          </>
      }

      <OpenDiningModal open={openModal} onClose={() => setOpenModal(false)} refetch={() => refetch} />
    </DashboardCard>
  );
};

export default TodayPaymentsCard;
