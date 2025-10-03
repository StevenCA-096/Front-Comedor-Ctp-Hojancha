import { Button } from "@mui/material";
import type { ReactNode } from "react";

interface TableButtonProps {
    Icon: ReactNode;
    label: string;
    onClick: () => void;
}

const TableButton = ({ Icon, label, onClick }: TableButtonProps) => {
    return (
        <Button
            fullWidth
            size="small"
            variant="outlined"
            startIcon={Icon}
            onClick={onClick}
            sx={{
                fontSize: '0.75rem',
                minWidth: 'auto',
                textTransform: 'none',
            }}
        >
            {label}
        </Button>
    );
};

export default TableButton