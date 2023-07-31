import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * WidgetWrapper is a styled component that wraps a Box component and applies custom styling.
 * It sets the padding, background color, and border radius of the wrapped Box component.
 *
 * @param {Object} theme - The theme object containing the palette and other styling properties.
 * @returns {React.Component} - The styled WidgetWrapper component.
 */
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
