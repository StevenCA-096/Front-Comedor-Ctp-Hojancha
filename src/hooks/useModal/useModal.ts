import { useState } from 'react'

const useModal = () => {
    const [open, setOpen] = useState(false)

    const openModal = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return {
        open,
        handleClose,
        openModal,
        setOpen
    }
}

export default useModal