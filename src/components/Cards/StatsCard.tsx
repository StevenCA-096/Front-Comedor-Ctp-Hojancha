import { Avatar, CardContent, Skeleton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import type { ReactNode } from "react"
import BlankCard from "../shared/BlankCard"
import type { OverridableStringUnion } from "@mui/types"

type ColorOptions = OverridableStringUnion<
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
>

interface StatsCardProps {
  title: string | null
  value: string | number | null | undefined
  icon: ReactNode
  color?: ColorOptions
  isLoading?: boolean
}

// Componente para mostrar estadísticas generales
const StatsCard = ({
  title,
  value,
  icon,
  color = "primary",
  isLoading = false,
}: StatsCardProps) => {
  return (
    <BlankCard>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex={1}>
            {isLoading ? (
              <>
                <Skeleton 
                  variant="text" 
                  width="60%" 
                  height={20}
                  animation="wave"
                  sx={{ mb: 0.5 }}
                />
                <Skeleton 
                  variant="text" 
                  width="80%" 
                  height={32}
                  animation="wave"
                />
              </>
            ) : (
              <>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem'
                  }}
                >
                  {title}
                </Typography>
                <Typography 
                  variant="h5" 
                  component="div" 
                  color="text.primary"
                  sx={{ 
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}
                >
                  {value}
                </Typography>
              </>
            )}
          </Box>
          
          {isLoading ? (
            <Skeleton 
              variant="circular" 
              width={56} 
              height={56}
              animation="wave"
            />
          ) : (
            <Avatar 
              sx={(theme) => ({ 
                bgcolor: theme.palette[color].dark + '20', // Alpha 20% (transparencia)
                color: `${color}.main`,
                width: 56,
                height: 56,
                boxShadow: 2,
                '& svg': {
                  fontSize: '1.5rem'
                }
              })}
            >
              {icon}
            </Avatar>
          )}
        </Box>
      </CardContent>
    </BlankCard>
  )
}

export default StatsCard