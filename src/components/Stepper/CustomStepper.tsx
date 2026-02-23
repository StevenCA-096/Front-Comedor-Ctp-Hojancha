import useIsMobile from "@/hooks/isMobile/useIsMobile"
import { CheckCircle } from "@mui/icons-material"
import type { SvgIconComponent } from "@mui/icons-material"
import { Box, LinearProgress, Paper, Stack, Step, StepLabel, Stepper, Typography, useTheme } from "@mui/material"
import { alpha } from "@mui/system"
import type { ReactNode } from "react"

export interface StepsProp {
    title: string
    icon: SvgIconComponent
    content?: ReactNode 
}

interface CustomStepperProps {
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    steps: StepsProp[]
    activeStep: number 
}

//This component renders a basic stepper with imporoved responsive design
const CustomStepper = ({
    steps,
    activeStep
}: CustomStepperProps) => {
    const theme = useTheme()
    const isMobile = useIsMobile()

    const progress = ((activeStep + 1) / steps.length) * 100
    const currentStep = steps[activeStep]
    const CurrentIcon = currentStep.icon

    return (
        <Box>
            {/* Desktop Stepper */}
            {!isMobile && (
                <Paper
                    elevation={0}
                    sx={{
                        px: 2,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        my: 1
                    }}
                >
                    <Stepper
                        activeStep={activeStep}
                        sx={{
                            '& .MuiStepLabel-root': {
                                cursor: 'default',
                            },
                            '& .MuiStepLabel-label': {
                                fontSize: '1rem',
                                fontWeight: 500,
                                '&.Mui-active': {
                                    fontWeight: 700,
                                    color: 'primary.main',
                                },
                                '&.Mui-completed': {
                                    fontWeight: 600,
                                },
                            },
                            '& .MuiStepConnector-line': {
                                borderTopWidth: 2,
                            },
                        }}
                    >
                        {steps.map((step, index) => {
                            const StepIcon = step.icon
                            return (
                                <Step key={step.title}>
                                    <StepLabel
                                        StepIconComponent={() => (
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    my: 1,
                                                    bgcolor: index === activeStep
                                                        ? 'primary.main'
                                                        : index < activeStep
                                                            ? 'success.main'
                                                            : alpha(theme.palette.divider, 0.1),
                                                    color: index <= activeStep ? 'white' : 'text.secondary',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    border: `2px solid ${index === activeStep
                                                        ? theme.palette.primary.main
                                                        : index < activeStep
                                                            ? theme.palette.success.main
                                                            : alpha(theme.palette.divider, 0.2)
                                                        }`,
                                                }}
                                            >
                                                {index < activeStep ? (
                                                    <CheckCircle sx={{ fontSize: 24 }} />
                                                ) : (
                                                    <StepIcon sx={{ fontSize: 24 }} />
                                                )}
                                            </Box>
                                        )}
                                    >
                                        {step.title}
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                </Paper>
            )}

            {/* Mobile Progress Header */}
            {isMobile && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 3,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                >
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                }}
                            >
                                <CurrentIcon sx={{ fontSize: 28 }} />
                            </Box>
                            <Box flex={1}>
                                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                    PASO {activeStep + 1} DE {steps.length}
                                </Typography>
                                <Typography variant="h6" fontWeight={700} color="primary.main">
                                    {currentStep.title}
                                </Typography>
                            </Box>
                        </Stack>
                        <Box>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 4,
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                    },
                                }}
                            />
                            <Typography variant="caption" color="text.secondary" mt={0.5} display="block" textAlign="right">
                                {Math.round(progress)}% completado
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            )}

            {/* Content Section */}
            <Paper
                elevation={0}
                sx={{
                    px: { xs: 1, sm: 3, md: 4 },
                    py: { xs: 3, sm: 3, md: 2 },
                    mb: 1,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    minHeight: 400,
                }}
            >
                {/* Desktop Title */}
                {!isMobile && (
                    <Box mb={4}>
                        <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
                            {currentStep.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Paso {activeStep + 1} de {steps.length}
                        </Typography>
                    </Box>
                )}

                {/* Step Content - Renderiza todos los pasos, muestra/oculta con display */}
                {steps.map((step, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: index === activeStep ? 'contents' : 'none'
                        }}
                    >
                        {step.content}
                    </Box>
                ))}
            </Paper>
        </Box>
    )
}

export default CustomStepper