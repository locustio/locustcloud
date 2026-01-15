"use client";

import DarkModeIcon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { THEME_MODE } from "constants/theme";

export default function DarkLightToggle() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const toggleMode = () =>
    setMode(mode == THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT);

  return (
    <IconButton color="inherit" onClick={toggleMode}>
      {mode === THEME_MODE.LIGHT ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
