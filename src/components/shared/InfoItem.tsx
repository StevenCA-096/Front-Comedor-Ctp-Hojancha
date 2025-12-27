import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import type { ReactNode } from "react";

type ColorOptions = "primary" | "secondary" | "error" | "info" | "success" | "warning"

interface InfoItemProps {
  icon?: React.ReactNode;
  label: string;
  value: string | null | number | undefined | ReactNode;
  color?: ColorOptions;
}

const InfoItem = ({ icon, label, value, color = 'primary' }: InfoItemProps) => {
  const theme = useTheme()
  const themeColor = theme.palette[color].main
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: alpha(themeColor, 0.04),
        border: `1px solid ${alpha(themeColor, 0.15)}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(themeColor, 0.08),
          borderColor: alpha(themeColor, 0.3),
          transform: 'translateX(4px)',
        }
      }}
    >
      {
        icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 2,
              flexShrink: 0
            }}
          >
            {icon && icon}
          </Box>
        )
      }

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
          letterSpacing={0.5}
          sx={{ mb: 0.5 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          fontWeight={600}
          sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize:'1rem'
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoItem