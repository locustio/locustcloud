"use client";
import { createTheme as createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  // colorSchemes: {
  //   light: {
  palette: {
    mode: "dark",
    primary: {
      main: "#15803d",
    },
    secondary: {
      main: "#0050D4",
    },
    success: {
      main: "#00C853",
    },
    accent: "#00e676",
  },
  // },
  // dark: {
  //   palette: {
  //     primary: {
  //       main: "#15803d",
  //     },
  //     secondary: {
  //       main: "#007bff",
  //     },
  //     success: {
  //       main: "#00C853",
  //     },
  //     accent: "#b8ee4b",
  //   },
  // },
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        p: { margin: 0 },
      },
    },
    /* Remove required asterisk, which is not useful since our fields are always required */
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { opacity: "0" },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        asterisk: { opacity: "0" },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "12px 24px",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: 16,
  },
});
