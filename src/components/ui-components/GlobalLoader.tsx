// components/GlobalLoader.tsx
"use client";

import React from "react";
import { useLoading } from "@/contexts/LoadingContext";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const GlobalLoader: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <Box
      sx={{ position: "fixed", top: 0, left: 0, zIndex: 1301, width: "100%" }}
    >
      <LinearProgress color="primary" />
    </Box>
  );
};

export default GlobalLoader;
