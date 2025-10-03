import type { TypographyProps } from "@mui/material";
import type { OverridableStringUnion } from "@mui/types";

// Props para `color`, igual que en `Typography` o `Button`
export type ColorOptions = OverridableStringUnion<
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "default",
  TypographyProps["color"]
>