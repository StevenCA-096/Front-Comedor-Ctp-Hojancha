import { Avatar, CardContent, Typography, useTheme } from "@mui/material"
import { alpha, Box } from "@mui/system"
import type { ReactNode } from "react"
import BlankCard from "../shared/BlankCard"
import type { ColorOptions } from "@/theme/ColorOptions"

interface StatsCardProps {
  title: string | null
  value: string | number | null | undefined
  icon: ReactNode
  color?: ColorOptions 
}

const StatsCard = ({
  title,
  value,
  icon,
  color = "primary",
}: StatsCardProps) => {
  const theme = useTheme()
  const paletteColor = color === 'default' ? 'primary' : color
  return (
    <BlankCard>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={'textPrimary'}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: alpha(theme.palette[paletteColor].main, 0.1), color: `${paletteColor}.main` }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </BlankCard>
  )
}

export default StatsCard
