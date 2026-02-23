import { ViewList, ViewModule } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";

export type ViewMode = "table" | "cards";

interface ViewToggleButtonProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ViewToggleButton = ({ viewMode, onChange }: ViewToggleButtonProps) => {
  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextMode: ViewMode | null
  ) => {
    if (nextMode) {
      onChange(nextMode);
    }
  };

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={viewMode}
      onChange={handleViewChange}
      aria-label="Cambiar vista"
    >
      <Tooltip title="Vista de tabla">
        <ToggleButton value="table" aria-label="Vista de tabla">
          <ViewList fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Vista de tarjetas">
        <ToggleButton value="cards" aria-label="Vista de tarjetas">
          <ViewModule fontSize="small" />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default ViewToggleButton;
