import { Select, MenuItem, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import type { mainChartData } from '../types/mainChartData';
import type { ApexOptions } from 'apexcharts';

interface AssistanceOverviewProps {
    mainChartData: mainChartData;
    mealTime: string,
    setMealTime: Dispatch<SetStateAction<string>>,
    mainChartDataLoading: boolean
}

const AssistanceOverview = ({ mainChartData, mealTime, setMealTime, mainChartDataLoading }: AssistanceOverviewProps) => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // Preparar datos según el mealTime seleccionado
    const chartData = useMemo(() => {
        if (!mainChartData) return { categories: [], assistances: [], revenues: [] };

        const selectedData = mealTime === 'Almuerzo' ? mainChartData?.lunch : mainChartData?.dinner;

        return {
            categories: selectedData?.map(item => item.date),
            assistances: selectedData?.map(item => item.assistances),
            revenues: selectedData?.map(item => item.revenue)
        };
    }, [mainChartData, mealTime]);

    // Configuración del gráfico con doble eje Y
    const optionscolumnchart: ApexOptions = {
        chart: {
            type: 'line',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '42%',
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            width: [0, 4], // 0 para barras, 4 para línea
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left'
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        // DOBLE EJE Y - Esta es la clave
        yaxis: [
            {
                // Eje Y izquierdo para asistencias
                title: {
                    text: 'Asistencias',
                    style: {
                        color: primary,
                        fontSize: '16px', // Tamaño del título
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    style: {
                        colors: primary,
                        fontSize: '14px', // Tamaño de los labels más grande
                        fontWeight: '600'
                    },
                    formatter: function (val: number) {
                        return Math.floor(val).toString();
                    }
                }
            },
            {
                // Eje Y derecho para ingresos
                opposite: true,
                title: {
                    text: 'Ingresos (₡)',
                    style: {
                        color: secondary,
                        fontSize: '16px', // Tamaño del título
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    style: {
                        colors: secondary,
                        fontSize: '14px', // Tamaño de los labels más grande
                        fontWeight: '600'
                    },
                    formatter: function (val) {
                        return '₡' + val.toLocaleString('es-CR');
                    }
                }
            }
        ],
        xaxis: {
            categories: chartData.categories,
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    fontSize: '13px', // También puedes hacer más grandes los labels del eje X
                    fontWeight: '500'
                }
            }
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
            y: [
                {
                    formatter: function (val: number) {
                        return val + ' asistencias';
                    }
                },
                {
                    formatter: function (val: number) {
                        return '₡' + val.toLocaleString('es-CR');
                    }
                }
            ]
        },
    };
    // Series del gráfico
    const seriescolumnchart = [
        {
            name: 'Asistencias esta semana',
            data: chartData.assistances,
        },
        {
            name: 'Ingresos esta semana',
            data: chartData.revenues,
        },
    ];

    return (
        <DashboardCard
            title="Resumen de asistencias"
            action={
                <Select
                    displayEmpty
                    size='small'
                    value={mealTime}
                    onChange={(e) => setMealTime(e.target.value)}
                    sx={{ width: '50%' }}
                >
                    <MenuItem value={'Almuerzo'}>
                        Almuerzo
                    </MenuItem>
                    <MenuItem value={'Cena'}>
                        Cena
                    </MenuItem>
                </Select>
            }
        >
            {
                mainChartDataLoading ?
                        <Skeleton height={370}/>
                    :
                    <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="bar"
                        height="370px"
                    />
            }
        </DashboardCard>
    );
};

export default AssistanceOverview;