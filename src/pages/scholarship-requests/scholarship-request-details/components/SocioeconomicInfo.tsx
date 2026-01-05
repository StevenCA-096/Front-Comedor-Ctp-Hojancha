import { Box, Chip, Grid2, Typography } from "@mui/material";
import { IconCheck, IconReportMoney, IconX } from "@tabler/icons-react";
import type { SocioeconomicInformation } from "@/types/student/SocioeconomicInformation";
import GradientCard from "@/components/shared/GradientCard";
import InfoItem from "@/components/shared/InfoItem";

const SocioeconomicInfo = ({ socioeconomic }: { socioeconomic: SocioeconomicInformation | undefined }) => (
  <GradientCard icon={<IconReportMoney />} title="Información Socioeconómica" color="warning">
    <Grid2 spacing={2} container>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="warning"
          label="Miembros del hogar"
          value={`${socioeconomic?.membersCount} personas`}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="warning"
          label="Ingreso mensual"
          value={`₡${socioeconomic?.monthlyIncome.toLocaleString()}`}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="warning"
          label="Ingreso per cápita"
          value={`₡${socioeconomic?.perCapitaIncome.toLocaleString()}`}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <InfoItem
          color="warning"
          label="Tipo de vivienda"
          value={socioeconomic?.housingType || 'No disponible'}
        />
      </Grid2>

      <Grid2 size={12}>
        <InfoItem
          color="warning"
          showBgColor
          label="Condición de salud"
          value={
            <Grid2 container alignItems={'center'}>
              <Chip
                icon={socioeconomic?.hasDisease ? <IconX size={16} /> : <IconCheck size={16} />}
                label={socioeconomic?.hasDisease ? "Sí presenta" : "No presenta"}
                size="small"
                color={socioeconomic?.hasDisease ? "warning" : "success"}
                variant="outlined"
              />
              <Box
                mx={2}
                sx={{
                  bgcolor: 'warning.lighter',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'warning.light'
                }}
              >
                <Typography variant="body2" color="text.warning" gutterBottom fontWeight={600}>
                  Descripción de la condición:
                </Typography>
                <Typography variant="body2">
                  {socioeconomic?.diseaseDescription}
                </Typography>
              </Box>
            </Grid2>
          }
        />
      </Grid2>
    </Grid2>
  </GradientCard>
);

export default SocioeconomicInfo;