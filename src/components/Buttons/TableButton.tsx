import type { ColorOptions } from "@/theme/ColorOptions";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import type { ReactNode } from "react";

interface TableButtonProps {
    Icon: ReactNode;
    label?: string;
    onClick: () => void,
    color?: ColorOptions
    disabled?: boolean
    loading?: boolean
}

const TableButton = ({ Icon, label, onClick, color = 'info', disabled = false, loading = false }: TableButtonProps) => {
    return (
        <Tooltip title={label}>
            <IconButton
                onClick={onClick}
                color={color}
                disabled={disabled || loading}
                sx={{':hover':{bgcolor:`${color}.light`}}}
            >
                {loading ? <CircularProgress size={18} color="inherit" /> : Icon}
            </IconButton>
        </Tooltip>
    );
};

export default TableButton
