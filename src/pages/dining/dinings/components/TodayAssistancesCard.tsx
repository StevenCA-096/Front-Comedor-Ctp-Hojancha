import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Fab, Tooltip } from '@mui/material';
import DashboardCard from '@components/shared/DashboardCard';
import { Check } from '@mui/icons-material';
import { IconUsers } from '@tabler/icons-react';
import { formatDateStringWithDays } from '@utils/date/format-date';
import { useNavigate } from 'react-router';
import type { TodayPaymentsCardProps } from '../types/TodayPaymentsCardProps';

const TodayAssistancesCard = ({ data, error, loading }: TodayPaymentsCardProps) => {
  const theme = useTheme();
  console.log(data)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (error || !data || !loading) {
    }
    navigate(`/register-dining-assistance/diningId/${data?.dining?.id}`)
  }

  return (
    <DashboardCard
      title="Confirmar asistencia"
      action={
        <Tooltip title={error || !data || loading ? "Caja cerrada" : 'Registrar asistencia'}>
          <Fab
            color="primary"
            size="medium"
            sx={{ color: '#ffffff' }}
            disabled={error || !data || loading}
            onClick={handleContinue}
          >
            <Check width={24} />
          </Fab>
        </Tooltip>

      }
    >
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={9}>
          <Typography variant="h3" fontWeight="700">
            {data?.totalAssistances} Asistencia{data?.totalAssistances > 1 ? 's' : ''}
          </Typography>
          <Stack direction="row" spacing={1} my={1} alignItems="center">
            <Avatar sx={{ width: 27, height: 27, background: theme.palette.primary.main }} >
              <IconUsers />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {(data?.totalStudents - data?.totalAssistances) || 0}
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
                {
                  data?.dining?.openingDate ?
                    formatDateStringWithDays(data?.dining?.openingDate as string)
                    :
                    'No abierta'
                }
              </Typography>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </DashboardCard>
  );
};

export default TodayAssistancesCard;
