import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { InfoRow, SectionTitle } from "./SectionParts";
import { IconCheck, IconReportMoney, IconX } from "@tabler/icons-react";
import type { SocioeconomicInformation } from "@/types/student/SocioeconomicInformation";

const SocioeconomicInfo = ({ socioeconomic }: {socioeconomic: SocioeconomicInformation | undefined}) => (
    <Box p={3} minHeight={{xs:'auto', md:360}}>
      <SectionTitle icon={<IconReportMoney size={22} />} title="Información Socioeconómica" />
      <Stack spacing={1}>
        <InfoRow 
          label="Miembros del hogar" 
          value={`${socioeconomic?.membersCount} personas`} 
        />
        <InfoRow 
          label="Ingreso mensual" 
          value={`₡${socioeconomic?.monthlyIncome.toLocaleString()}`} 
        />
        <InfoRow 
          label="Ingreso per cápita" 
          value={`₡${socioeconomic?.perCapitaIncome.toLocaleString()}`} 
        />
        <InfoRow label="Tipo de vivienda" value={socioeconomic?.housingType} />
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" color="text.secondary">
            Condición de salud:
          </Typography>
          <Chip
            icon={socioeconomic?.hasDisease ? <IconX size={16} /> : <IconCheck size={16} />}
            label={socioeconomic?.hasDisease ? "Sí presenta" : "No presenta"}
            size="small"
            color={socioeconomic?.hasDisease ? "warning" : "success"}
            variant="outlined"
          />
        </Box>
        
        {socioeconomic?.hasDisease && socioeconomic?.diseaseDescription && (
          <Box 
            mt={1} 
            p={2} 
            sx={{ 
              bgcolor: 'warning.lighter', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'warning.light'
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Descripción:
            </Typography>
            <Typography variant="body2">
              {socioeconomic.diseaseDescription}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
);

export default SocioeconomicInfo