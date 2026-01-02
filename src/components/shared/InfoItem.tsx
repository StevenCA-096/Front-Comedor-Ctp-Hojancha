import { Box, Typography, alpha, useTheme } from '@mui/material'
import type { ReactNode } from 'react'

export type ColorOptions = "primary" | "secondary" | "error" | "info" | "success" | "warning"

interface InfoItemProps {
  icon?: React.ReactNode
  label: string
  value: string | ReactNode
  color: ColorOptions
  showBgColor?: boolean
}

//This component is to show display information in a standarized component across the application
const InfoItem = ({ icon, label, value, color, showBgColor = false }: InfoItemProps) => {
  const theme = useTheme()
  const MainColorFromTheme = theme.palette[color].main

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: showBgColor ? alpha(MainColorFromTheme, 0.04) : '',
        border: showBgColor ? `1px solid ${alpha(MainColorFromTheme, 0.15)}` : '',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(MainColorFromTheme, 0.08),
          borderColor: alpha(MainColorFromTheme, 0.3),
          transform: 'translateX(4px)',
        }
      }}
    >
      {
        icon &&
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: alpha(MainColorFromTheme, 0.1),
            color: MainColorFromTheme,
            flexShrink: 0
          }}
        >
          {icon}
        </Box>
      }

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={600}
          display="block"
          textTransform="uppercase"
          letterSpacing={0.5}
          sx={{ mb: 0.5 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoItem