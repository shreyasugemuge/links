import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * FlexBetween is a styled component that extends the Box component.
 * It sets the display property to "flex", justifyContent property to "space-between",
 * and alignItems property to "center".
 * 
 * @component
 * @example
 * <FlexBetween>
 *   // child components
 * </FlexBetween>
 */
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
