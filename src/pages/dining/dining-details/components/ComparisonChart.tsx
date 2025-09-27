import { CardContent, Typography } from "@mui/material"
import BlankCard from "../../../../components/shared/BlankCard"
import ApexChart from 'react-apexcharts'
import type MealtimeStatsDto from "@/types/dining/dining/dtos/MealTimeStatsDto"
import type { ApexOptions } from "apexcharts"

interface ComparisonChartProps {
    lunchData: MealtimeStatsDto,
    dinnerData: MealtimeStatsDto 
}

const ComparisonChart = ({ lunchData, dinnerData }: ComparisonChartProps) => {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: true,

        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Almuerzo', 'Cena'],
        },
        yaxis: [
            {
                // Eje Y izquierdo para asistencias
                title: {
                    text: 'Asistencias',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: '600'
                    }
                }
            },
            {
                // Eje Y derecho para ingresos
                opposite: true,
                title: {
                    text: 'Ingresos (₡)',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }
                },
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: '600'
                    },
                    formatter: function (val) {
                        return '₡' + (val / 1000).toFixed(0) + 'K'
                    }
                }
            }
        ],
        fill: {
            opacity: 0.8
        },
        tooltip: {
            y: {
                formatter: function (val, opts) {
                    if (opts.seriesIndex === 1) { // Para ingresos
                        return "₡" + val.toLocaleString()
                    }
                    return val + " estudiantes"
                }
            }
        },
        colors: ['#1976d2', '#388e3c']
    }

    const series: ApexAxisChartSeries | ApexNonAxisChartSeries  = [
        {
            name: 'Estudiantes',
            type: 'column',
            data: [lunchData.totalStudents, dinnerData?.totalStudents],
            zIndex: 0
        },
        {
            name: 'Ingresos',
            type: 'column',
            zIndex: 1,
            data: [lunchData?.totalRevenue, dinnerData?.totalRevenue]
        }
    ]

    return (
        <BlankCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Comparación Almuerzo vs Cena
                </Typography>
                <ApexChart
                    options={chartOptions}
                    series={series}
                    type="bar"
                    height={350}
                />
            </CardContent>
        </BlankCard>
    )
}

export default ComparisonChart