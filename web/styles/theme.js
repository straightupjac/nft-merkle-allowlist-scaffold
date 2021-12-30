import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  // customize your theme here
});

theme = responsiveFontSizes(theme);

export default theme;
