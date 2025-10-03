import type { ColorOptions } from '@/theme/ColorOptions';
import { Chip, alpha, useTheme, type ChipProps, type Theme } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import type { JSXElementConstructor, ReactElement } from 'react';


interface CustomChipProps extends ChipProps {
    label: string;
    color?: ColorOptions;
    sx?: SxProps<Theme>,
    icon?: ReactElement<unknown, string | JSXElementConstructor<any>> | undefined,
}

// helper outside the component
const getStatusColor = (theme: Theme, status: ColorOptions): string => {
    const colorMap: Record<ColorOptions, string> = {
        default: theme.palette.grey[600],
        success: theme.palette.success.main,
        error: theme.palette.error.main,
        warning: theme.palette.warning.main,
        info: theme.palette.info.main,
        primary: theme.palette.primary.main,
        secondary:''
    };
    return colorMap[status];
};

const CustomChip = ({ label, color = 'default', sx, icon }: CustomChipProps) => {
    const theme = useTheme();
    const colorFromMap = getStatusColor(theme, color);

    return (
        <Chip
            icon={icon}
            label={label}
            sx={{
                backgroundColor: alpha(colorFromMap, 0.04),
                color: colorFromMap,
                fontWeight: 500,
                border: 'none',
                '&:hover': {
                    backgroundColor: alpha(colorFromMap, 0.15),
                },
                ...sx,
            }}
        />
    );
};

export default CustomChip;
