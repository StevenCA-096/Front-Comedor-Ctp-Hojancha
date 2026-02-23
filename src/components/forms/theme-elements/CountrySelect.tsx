import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { type AutocompleteChangeDetails, type AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { countries, type CountryType } from '@/utils/locations/countries';
import { FormHelperText } from '@mui/material';

interface CountrySelectProps {
    onChange?: ((event: React.SyntheticEvent<Element, Event>, value: CountryType | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<CountryType> | undefined) => void) | undefined
    error?: boolean
    errorMessage?: string
}

const CountrySelect = ({ onChange, error, errorMessage }: CountrySelectProps) => {
    return (
        <>
        <Autocomplete
            fullWidth
            onChange={onChange}
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <Box
                        key={key}
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...optionProps}
                    >
                        <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt=""
                        />
                        {option.label} ({option.code}) +{option.phone}
                    </Box>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Seleccione un pais"
                    slotProps={{
                        htmlInput: {
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        },
                    }}
                />
            )}
        />
        <FormHelperText sx={{color: error ? 'transparent': ''}}>
            {errorMessage}
        </FormHelperText>
        </>
        
    );
}

export default CountrySelect