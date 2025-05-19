import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Courier New, monospace",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default theme;
