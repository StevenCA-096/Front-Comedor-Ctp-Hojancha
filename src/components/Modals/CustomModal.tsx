import { Dialog, DialogContent, DialogTitle, Slide, Typography, useTheme } from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions';
import type { ReactNode } from 'react'
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomModalProps {
    children: ReactNode, 
    title: string, 
    onClose: () => void, 
    open: boolean
}

const CustomModal = ({ children, title, onClose, open }: CustomModalProps) => {
    const theme = useTheme()
    return (
        <Dialog open={open} onClose={onClose}
        slots={{
          transition: Transition,
        }}
        >
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