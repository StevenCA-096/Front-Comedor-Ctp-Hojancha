import useIsDarkMode from '@/hooks/IsDarkMode/useIsDarkMode'
import logoLight from '@assets/images/logos/CTP/Logo_ctp-mep.webp'
import logoDark from '@assets/images/logos/CTP/logo-mep-dark-mode.webp'
import { Box, type SxProps } from '@mui/material'

interface LogoMepInstitutionProps {
    sx: SxProps
}

const LogoMepInstitution = ({ sx = {} }: LogoMepInstitutionProps) => {
    const isDarkMode = useIsDarkMode()
    console.log(isDarkMode)
    return (
        <Box component={'img'} src={isDarkMode ? logoDark : logoLight} sx={{objectFit:"contain",...sx}} alt="Logo" />
    )
}

export default LogoMepInstitution