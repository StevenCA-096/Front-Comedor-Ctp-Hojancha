import { Avatar, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import type { ReactNode } from "react"
import BlankCard from "../shared/BlankCard"
import type { ColorOptions } from "@/theme/ColorOptions"

interface StatsCardProps {
  title: string | null
  value: string | number | null | undefined
  icon: ReactNode
  color?: ColorOptions
}

// Componente para mostrar estadísticas generales
const StatsCard = ({
  title,
  value,
  icon,
  color = "primary",
}: StatsCardProps) => {
  return (
    <BlankCard>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={'textSecondary'}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main` }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </BlankCard>
  )
}

export default StatsCard
