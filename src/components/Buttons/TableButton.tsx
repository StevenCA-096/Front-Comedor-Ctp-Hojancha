import type { ColorOptions } from "@/theme/ColorOptions";
import { IconButton, Tooltip } from "@mui/material";
import type { ReactNode } from "react";

interface TableButtonProps {
    Icon: ReactNode;
    label?: string;
    onClick: () => void,
    color?: ColorOptions
}

const TableButton = ({ Icon, label, onClick, color = 'info' }: TableButtonProps) => {
    return (
        <Tooltip title={label}>
            <IconButton onClick={onClick} color={color} sx={{':hover':{bgcolor:`${color}.light`}}}>
                {Icon}
            </IconButton>
        </Tooltip>
    );
};

export default TableButton