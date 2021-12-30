import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: "",
    secondary: "",
  }
});

theme = responsiveFontSizes(theme);

export default theme;
