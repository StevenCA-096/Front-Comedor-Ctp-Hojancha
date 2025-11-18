import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Chart from 'react-apexcharts';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { CalendarMonth, Coffee, CreditCard, Money, TrendingUp } from '@mui/icons-material';
import { IconCalendarCheck, IconMoon, IconUsers } from '@tabler/icons-react';
import StatsCard from '@/components/Cards/StatsCard';


// Schema de validación
const reportSchema = z.object({
  startDate: z.string().min(1, 'Fecha inicial requerida'),
  endDate: z.string().min(1, 'Fecha final requerida'),
}).refine((data) => {
  return new Date(data?.startDate) <= new Date(data?.endDate);
}, {
  message: 'La fecha inicial debe ser menor o igual a la fecha final',
  path: ['endDate'],
});

// Datos quemados
const mockData: any = {
  period: {
    startDate: "2025-11-05",
    endDate: "2025-11-06",
    daysCount: 2
  },
  summary: {
    totalStudents: 8,
    totalRevenue: 700,
    totalExpectedRevenue: 800,
    avgDailyRevenue: 350,
    avgDailyStudents: 4,
    totalDinings: 1
  },
  paymentMethods: {
    "Efectivo": {
      count: 8,
      amount: 700
    }
  },
  mealComparison: {
    lunch: {
      totalStudents: 8,
      totalRevenue: 700,
      avgPerService: 8,
      servicesCount: 1
    },
    dinner: {
      totalStudents: 0,
      totalRevenue: 0,
      avgPerService: 0,
      servicesCount: 0
    }
  },
  dailyTimeSeries: [
    {
      date: "2025-11-05",
      lunch: {
        students: 8,
        revenue: 700,
        expectedRevenue: 800
      },
      dinner: {
        students: 0,
        revenue: 0,
        expectedRevenue: 0
      },
      total: {
        students: 8,
        revenue: 700,
        expectedRevenue: 800
      }
    }
  ],
  weeklyTrends: [
    {
      dayName: "Martes",
      avgStudents: 8,
      avgRevenue: 700,
      occurrences: 1
    }
  ]
};

// Formulario de fechas
const DateRangeForm = ({ onSubmit }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      startDate: '2025-11-05',
      endDate: '2025-11-06',
    }
  });

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
          Seleccionar Período
        </Typography>
        <Box component="div" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={4}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha Inicial"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors?.startDate}
                    helperText={errors?.startDate?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha Final"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors?.endDate}
                    helperText={errors?.endDate?.message as string}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                fullWidth
                size="large"
                sx={{ height: '56px' }}
              >
                Generar Reporte
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

const Reports = () => {
  const [reportData] = useState<any>(mockData);
  const [showReport] = useState(true);

  const handleGenerateReport = (formData: any) => {
    console.log('Generando reporte:', formData);
    // Aquí llamarías a: getReportByDateRange(formData.startDate, formData.endDate)
  };

  // Configuración del gráfico de ingresos diarios
  const dailyRevenueChart = {
    series: [{
      name: 'Ingresos',
      data: reportData?.dailyTimeSeries?.map((day: any) => day?.total?.revenue || 0) || []
    }, {
      name: 'Ingresos Esperados',
      data: reportData?.dailyTimeSeries?.map((day: any) => day?.total?.expectedRevenue || 0) || []
    }],
    options: {
      chart: {
        type: 'area' as const,
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      colors: ['#2563eb', '#94a3b8'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' as const, width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        }
      },
      xaxis: {
        categories: reportData?.dailyTimeSeries?.map((day: any) => 
          new Date(day?.date || '').toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
        ) || [],
        labels: { style: { fontSize: '12px' } }
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `₡${value?.toFixed(0) || 0}`
        }
      },
      legend: { position: 'top' as const },
      grid: { borderColor: '#f1f5f9' }
    }
  };

  // Gráfico de comparación almuerzo vs cena
  const mealComparisonChart = {
    series: [{
      name: 'Estudiantes',
      data: [
        reportData?.mealComparison?.lunch?.totalStudents || 0,
        reportData?.mealComparison?.dinner?.totalStudents || 0
      ]
    }, {
      name: 'Ingresos',
      data: [
        reportData?.mealComparison?.lunch?.totalRevenue || 0,
        reportData?.mealComparison?.dinner?.totalRevenue || 0
      ]
    }],
    options: {
      chart: {
        type: 'bar' as const,
        toolbar: { show: false }
      },
      colors: ['#f59e0b', '#10b981'],
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '50%',
          dataLabels: { position: 'top' as const }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: { fontSize: '12px', colors: ['#304758'] }
      },
      xaxis: {
        categories: ['Almuerzo', 'Cena'],
        labels: { style: { fontSize: '13px', fontWeight: 600 } }
      },
      legend: { position: 'top' as const },
      grid: { borderColor: '#f1f5f9' }
    }
  };

  // Gráfico de tendencias semanales
  const weeklyTrendsChart = {
    series: [{
      name: 'Promedio Estudiantes',
      data: reportData?.weeklyTrends?.map((trend: any) => trend?.avgStudents || 0) || []
    }],
    options: {
      chart: {
        type: 'line' as const,
        toolbar: { show: false }
      },
      colors: ['#8b5cf6'],
      stroke: { curve: 'smooth' as const, width: 3 },
      markers: { size: 5 },
      xaxis: {
        categories: reportData?.weeklyTrends?.map((trend: any) => trend?.dayName || '') || []
      },
      yaxis: {
        labels: {
          formatter: (value: number) => value?.toFixed(0) || '0'
        }
      },
      grid: { borderColor: '#f1f5f9' }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
        Reportes de Comedor
      </Typography>

      <DateRangeForm onSubmit={handleGenerateReport} />

      {showReport && reportData && (
        <>
          {/* Período del reporte */}
          <Alert severity="info" icon={<CalendarMonth />} sx={{ mb: 3 }}>
            Período: <strong>{reportData?.period?.startDate}</strong> a <strong>{reportData?.period?.endDate}</strong> ({reportData?.period?.daysCount || 0} días)
          </Alert>

          {/* Tarjetas de resumen */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                icon={<IconUsers />}
                title="Total Estudiantes"
                value={`${reportData?.summary?.totalStudents || 0} (${reportData?.summary?.avgDailyStudents || 0}/día)`}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                icon={<Money  />}
                title="Ingresos Totales"
                value={`₡${reportData?.summary?.totalRevenue || 0}`}
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                icon={<TrendingUp />}
                title="Ingresos Esperados"
                value={`₡${reportData?.summary?.totalExpectedRevenue || 0}`}
                color="warning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                icon={<IconCalendarCheck size={24} />}
                title="Total Servicios"
                value={reportData?.summary?.totalDinings || 0}
                color="secondary"
              />
            </Grid>
          </Grid>

          {/* Métodos de pago */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCard />
                Métodos de Pago
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {Object.entries(reportData?.paymentMethods || {}).map(([method, data]: [string, any]) => (
                  <Chip
                    key={method}
                    label={`${method}: ${data?.count || 0} (₡${data?.amount || 0})`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: '14px', py: 2.5 }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Gráficos */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="600">
                    Ingresos Diarios
                  </Typography>
                  <Chart
                    options={dailyRevenueChart.options}
                    series={dailyRevenueChart.series}
                    type="area"
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="600">
                    Almuerzo vs Cena
                  </Typography>
                  <Chart
                    options={mealComparisonChart.options}
                    series={mealComparisonChart.series}
                    type="bar"
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Comparación de comidas */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Coffee />
                    <Typography variant="h6" fontWeight="600">
                      Almuerzo
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Estudiantes</Typography>
                      <Typography variant="h5" fontWeight="600">{reportData?.mealComparison?.lunch?.totalStudents || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Ingresos</Typography>
                      <Typography variant="h5" fontWeight="600">₡{reportData?.mealComparison?.lunch?.totalRevenue || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Promedio/Servicio</Typography>
                      <Typography variant="h6">{reportData?.mealComparison?.lunch?.avgPerService || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Servicios</Typography>
                      <Typography variant="h6">{reportData?.mealComparison?.lunch?.servicesCount || 0}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <IconMoon />
                    <Typography variant="h6" fontWeight="600">
                      Cena
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Estudiantes</Typography>
                      <Typography variant="h5" fontWeight="600">{reportData?.mealComparison?.dinner?.totalStudents || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Ingresos</Typography>
                      <Typography variant="h5" fontWeight="600">₡{reportData?.mealComparison?.dinner?.totalRevenue || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Promedio/Servicio</Typography>
                      <Typography variant="h6">{reportData?.mealComparison?.dinner?.avgPerService || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" variant="body2">Servicios</Typography>
                      <Typography variant="h6">{reportData?.mealComparison?.dinner?.servicesCount || 0}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tendencias semanales */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Tendencias Semanales
              </Typography>
              <Chart
                options={weeklyTrendsChart.options}
                series={weeklyTrendsChart.series}
                type="line"
                height={250}
              />
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Reports;