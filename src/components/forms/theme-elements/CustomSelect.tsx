import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    useTheme,
    type SelectChangeEvent,
} from "@mui/material";
import type { ReactNode } from "react";

export interface SelectOption {
    label: string | number;
    value: string | number |undefined;
}

interface CustomSelectProps {
    onChange: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined;
    error?: boolean;
    errorMessage?: string;
    options?: SelectOption[];
    label?: string;
    value?: string | undefined;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    multiple?: boolean
}

const CustomSelect = ({
    onChange,
    error = false,
    errorMessage,
    options = [],
    label,
    value,
    disabled = false,
    placeholder = "Seleccione una opción",
    name,
    multiple
}: CustomSelectProps) => {
    const theme = useTheme();

    return (
        <FormControl fullWidth error={error} disabled={disabled}>
            {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
            <Select
                multiple={multiple}
                multiline={multiple}
                fullWidth
                labelId={label ? `${name}-label` : undefined}
                label={label}
                value={value}
                onChange={onChange}
                name={name}
                renderValue={(selected) => {
                    if (!selected) {
                        return <span style={{ color: theme.palette.text.secondary }}>{placeholder}</span>;
                    }
                    const option = options.find((opt) => opt.value === selected);
                    return option?.label || selected;
                }}
            >
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText
                sx={{
                    color: error ? theme.palette.error.main : theme.palette.text.secondary,
                    minHeight: '20px',
                }}
            >
                {error ? errorMessage : ' '}
            </FormHelperText>
        </FormControl>
    );
};

export default CustomSelect;