import { ExpandMore, Search } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Grid2, InputAdornment, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import type { SortDirection, SortOption } from "@/hooks/filters/useSearchAndSort";

interface ListFiltersProps<T> {
  search: string;
  onSearchChange: (value: string) => void;
  sortKey: string;
  onSortKeyChange: (value: string) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (value: SortDirection) => void;
  sortOptions: SortOption<T>[];
  title?: string;
  defaultExpanded?: boolean;
}

const ListFilters = <T,>({
  search,
  onSearchChange,
  sortKey,
  onSortKeyChange,
  sortDirection,
  onSortDirectionChange,
  sortOptions,
  title = "Filtros",
  defaultExpanded = true,
}: ListFiltersProps<T>) => {
  return (
    <Accordion defaultExpanded={defaultExpanded} disableGutters sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Busqueda general"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Ordenar por"
              value={sortKey}
              onChange={(event) => onSortKeyChange(event.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.key} value={option.key}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <Stack direction="row" justifyContent={{ xs: "flex-start", md: "flex-end" }}>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={sortDirection}
                onChange={(_event, value: SortDirection | null) => {
                  if (value) onSortDirectionChange(value);
                }}
              >
                <ToggleButton value="asc">Ascendente</ToggleButton>
                <ToggleButton value="desc">Descendente</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Grid2>
        </Grid2>
      </AccordionDetails>
    </Accordion>
  );
};

export default ListFilters;
