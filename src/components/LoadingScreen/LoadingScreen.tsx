import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"

const LoadingScreen = ({sx = {}}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', ...sx }}>
            <Box>
                <CircularProgress />
            </Box>
            <Box>
                Cargando...
            </Box>
        </Box>
    )
}

export default LoadingScreen