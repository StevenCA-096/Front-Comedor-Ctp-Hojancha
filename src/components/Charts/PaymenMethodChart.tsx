import type { PaymentStats } from '@/types/dining/dining/dtos/PaymentStats'
import BlankCard from '../shared/BlankCard'
import { CardContent, Typography } from '@mui/material'
import ApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

// Componente para el gráfico de métodos de pago
interface PaymentMethodsChartProps {
    paymentStats: PaymentStats | undefined,
    title:string
}

const PaymentMethodsChart = ({ paymentStats, title }: PaymentMethodsChartProps) => {
    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut',
            height: 300
        },
        labels: Object.keys(paymentStats || {}),
        colors: ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    const series = Object.values(paymentStats || {})

    return (
        <BlankCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <ApexChart
                    options={chartOptions}
                    series={series}
                    type="donut"
                    height={300}
                />
            </CardContent>
        </BlankCard>
    )
}

export default PaymentMethodsChart