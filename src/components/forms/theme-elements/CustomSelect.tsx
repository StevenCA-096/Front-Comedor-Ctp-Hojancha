import { FormControl, FormHelperText, FormLabel, MenuItem, Select, useTheme, type SelectChangeEvent } from "@mui/material"
import type { ReactNode } from "react";

interface option {
    label: string | number,
    value: string | number
}

interface CustomSelectProps {
    onchange: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined;
    error?: boolean;
    errorMessage?: string;
    options?: option[] | [];
    label?: string;
}
//To use with react hook form the seyValue shall be paased, it can be done with the change
const CustomSelect = ({
    onchange,
    error,
    errorMessage,
    options = [],//[{value, label}]
    label,
    
}: CustomSelectProps) => {
    const theme = useTheme()

    return (
        <>
            <FormControl fullWidth >
                <FormLabel>
                    {label}
                </FormLabel>
                <Select onChange={onchange} displayEmpty renderValue={(value) => <>{value || options[0]?.value}</>} fullWidth >
                    {
                        options?.map((item, index) =>
                            <MenuItem key={index} value={item?.value}>
                                {item?.label}
                            </MenuItem>
                        )
                    }
                </Select>
                <FormHelperText
                    sx={{
                        color: error ? theme.palette.error.main : 'transparent',
                    }}
                >
                    {errorMessage || 'error'}
                </FormHelperText>
            </FormControl>
        </>
    )
}

export default CustomSelect