"use client";

// material-ui
import { styled } from "@mui/material/styles";

// types
import { ThemeMode } from "@/types/config";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === ThemeMode.DARK
      ? theme.palette.background.default
      : theme.palette.grey[100],
  minHeight: "100vh",
  backgroundImage: theme.palette.background.paper,
  backgroundSize: "cover", // outras opções: 'contain', 'auto', 'cover'
  backgroundPosition: "bottom", // outras opções: 'top', 'right', 'bottom', 'left'
}));

export default AuthWrapper1;
