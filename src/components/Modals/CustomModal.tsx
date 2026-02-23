import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme, type DialogProps } from '@mui/material'
import type { ReactNode } from 'react'

//For components that uses modal, helper to save work adding props
export interface GenericModalProps {
    onClose: () => void, 
    open: boolean
}

interface CustomModalProps {
    children: ReactNode, 
    title: string, 
    onClose: () => void, 
    open: boolean
    maxWidth?: DialogProps['maxWidth']
    fullScreen?: boolean
}

const CustomModal = ({ children, title, onClose, open, maxWidth, fullScreen }: CustomModalProps) => {
    const theme = useTheme()
    return (
        <Dialog fullWidth open={open} onClose={onClose} maxWidth={maxWidth} fullScreen={fullScreen}>
            <DialogTitle
                sx={{
                    background: theme.palette.primary.main,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: theme.spacing(2, 3),
                }}
            >
                <Typography variant="h5" color={'white'} sx={{ flex: 1 }}>
                    {title}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <Close sx={{ height: 20 }} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{bgcolor:theme.palette.background.default}}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal