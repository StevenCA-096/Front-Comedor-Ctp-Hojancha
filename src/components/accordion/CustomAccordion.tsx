import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, useTheme } from '@mui/material'
import { alpha } from '@mui/system'
import { type ReactNode } from 'react'

const CustomAccordion = ({ defaultExpanded, children, title }: { defaultExpanded?: boolean, children: ReactNode, title: string }) => {
    const theme = useTheme()
    return (
        <Accordion defaultExpanded={defaultExpanded}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                          },
                        }}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default CustomAccordion