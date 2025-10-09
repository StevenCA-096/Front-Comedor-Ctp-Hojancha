import { Box, Grid2, Typography } from "@mui/material";
//Elements use to keep the same structure in the details
export const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <Box display="flex" alignItems="center" gap={1.5} mb={3}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 2,
        bgcolor: 'primary.light',
        color: 'primary.main'
      }}
    >
      {icon}
    </Box>
    <Typography variant="h5" fontWeight={600}>{title}</Typography>
  </Box>
);

export const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Grid2 container   gap={1} mb={1.5}>
    <Grid2>
      <Typography variant="body1" color="text.secondary" sx={{ minWidth: '140px' }}>
        {label}:
      </Typography>
    </Grid2>
    <Grid2>
      <Typography variant="body1" fontWeight={500}>
        {value}
      </Typography>
    </Grid2>
  </Grid2>
);
