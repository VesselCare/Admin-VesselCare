"use client";
// react
import {
  Box,
  Grid2,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
// components
import Logo from "@/components/ui-components/Logo";
import Link from "next/link";

const LoadingScreen = ({ progress }: { progress?: number }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      position="fixed"
      top={0}
      left={0}
      zIndex={9999}
      bgcolor={theme.palette.background.default}
    >
      {/* Logo Centralizada */}
      <Grid2>
        <Link
          href="/"
          aria-label="logo"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </Link>
      </Grid2>

      {/* Barra de Carregamento */}
      <Box sx={{ width: "300px", mt: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Typography mt={2} variant="body1" color="text.secondary">
        {progress ? `Loading... ${Math.round(progress)}%` : "Loading..."}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
