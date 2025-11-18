import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
  LinearProgress,
  Chip,
  Tooltip
} from "@mui/material"
import {
  IconEdit,
  IconPercentage,
  IconSchool,
  IconAdjustments
} from "@tabler/icons-react"
import { alpha } from "@mui/system"
import CustomButton from "@/components/Buttons/CustomButton"
import type { ScholarshipAvailability } from "@/types/scholarship/scholarshipAvailability/entities/scholarshipAvailability"
import type { Scholarship } from "@/types/scholarship/scholarship/entities/scholarship.entity"

interface ScholarshipCardProps {
  scholarship: Scholarship,
  setScholarship: React.Dispatch<React.SetStateAction<Scholarship | null>>
  setScholarshipAvailability: React.Dispatch<React.SetStateAction<ScholarshipAvailability | null>>
  setScholarshipAvailabilityOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ScholarshipCard = ({ scholarship, setScholarship, setScholarshipAvailability, setScholarshipAvailabilityOpen }: ScholarshipCardProps) => {
  const { name, coverage } = scholarship

  // Determinar color según el porcentaje de cobertura
  const getCoverageColor = (coverage: number) => {
    if (coverage === 0) return 'error'
    if (coverage <= 50) return 'warning'
    return 'success'
  }

  const coverageColor = getCoverageColor(coverage)

  const handleAvailabilityClick = (year: number) => {
    const found = scholarship.scholarship_availabilities?.find((sa) => sa.year == year)
    if (found) {
      setScholarshipAvailability({ ...found, scholarship: scholarship })
      setScholarshipAvailabilityOpen(true)
      return
    }
    setScholarshipAvailabilityOpen(true)
    setScholarshipAvailability({ id: 0, quota: 0, year: year, scholarship: scholarship })
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          borderColor: `${coverageColor}.main`,
        }
      }}
    >
      {/* Badge de porcentaje */}
      <Box
        sx={{
          position: 'absolute',
          top: -12,
          right: 12,
          bgcolor: `${coverageColor}.main`,
          color: 'white',
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          boxShadow: 2,
          zIndex: 1
        }}
      >
        <IconPercentage size={16} />
        <Typography variant="body2" fontWeight="bold">
          {coverage}%
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        {/* Icono principal */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: alpha(coverageColor === 'error' ? '#f44336' : coverageColor === 'warning' ? '#ff9800' : '#4caf50', 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          <IconSchool size={28} color={coverageColor === 'error' ? '#f44336' : coverageColor === 'warning' ? '#ff9800' : '#4caf50'} />
        </Box>

        {/* Nombre de la beca */}
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: 48
          }}
        >
          {name}
        </Typography>

        {/* Barra de progreso visual */}
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Cobertura
            </Typography>
            <Typography variant="caption" fontWeight="bold" color={`${coverageColor}.main`}>
              {coverage}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={coverage}
            color={coverageColor}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: alpha(coverageColor === 'error' ? '#f44336' : coverageColor === 'warning' ? '#ff9800' : '#4caf50', 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }}
          />
        </Box>

        {/* Chip de estado */}
        <Box mb={2}>
          <Chip
            label={coverage === 0 ? 'Sin cobertura' : coverage === 100 ? 'Cobertura total' : 'Cobertura parcial'}
            color={coverageColor}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Acciones */}
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title='Editar'>
            <IconButton
              size="small"
              color="primary"
              sx={{
                '&:hover': {
                  bgcolor: alpha('#1976d2', 0.1)
                }
              }}
              onClick={() => setScholarship(scholarship)}
            >
              <IconEdit size={18} />
            </IconButton>
          </Tooltip>
          <CustomButton
            icon={<IconAdjustments />}
            label={"Cupos " + new Date().getFullYear()}
            onClickFn={() => handleAvailabilityClick(new Date().getFullYear())}
          />
          <CustomButton
            icon={<IconAdjustments />}
            label={"Cupos " + (new Date().getFullYear() + 1)}
            onClickFn={() => handleAvailabilityClick(new Date().getFullYear() + 1)}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ScholarshipCard