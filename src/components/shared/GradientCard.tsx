import { Box, Typography, useTheme } from "@mui/material"
import BlankCard from "./BlankCard"
import { alpha } from "@mui/system"
import type { ReactNode } from "react"

type ColorOptions = "primary" | "secondary" | "error" | "info" | "success" | "warning" 

interface GradientCardProps {
    icon?: ReactNode
    children: ReactNode
    title: string
    color : ColorOptions
}



const GradientCard = ({ children, title, icon, color }: GradientCardProps) => {
    const theme = useTheme()
    
    return (
        <BlankCard>
            {}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.08)} 0%, ${alpha(theme.palette[color].main, 0.02)} 100%)`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    p: 2.5,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {
                    icon && icon        
                }
                
                <Typography variant="h5" fontWeight={600} ml={1}>
                    {title}
                </Typography>
            </Box>


            <Box p={3}>
                {
                    children
                }
            </Box>
        </BlankCard>
    )
}

export default GradientCard