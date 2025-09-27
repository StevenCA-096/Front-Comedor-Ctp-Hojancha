import { Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import type { ReactNode } from 'react'

interface CustomModalProps {
    children: ReactNode, 
    title: string, 
    onClose: () => void, 
    open: boolean
}

const CustomModal = ({ children, title, onClose, open }: CustomModalProps) => {
    const theme = useTheme()
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    background: theme.palette.primary.main,
                    boxShadow: 2
                }}
            >
                <Typography textAlign={'center'} variant="h4" color={'white'}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal