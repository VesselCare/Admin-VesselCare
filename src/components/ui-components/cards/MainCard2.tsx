"use client";
import React, { Ref } from "react";

// material-ui
import Card, { CardProps } from "@mui/material/Card";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// project-import
import useConfig from "@/hooks/useConfig";

// types
import { ThemeMode } from "../../../types/config";
import { KeyedObject } from "../../../types";

// ==============================|| CUSTOM MAIN CARD ||============================== //

export interface MainCardProps extends KeyedObject {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  sx?: CardProps["sx"];
  secondary?: React.ReactNode;
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

const MainCard2 = React.forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { mode } = useConfig();
    const defaultShadow =
      mode === ThemeMode.DARK
        ? "0 2px 14px 0 rgb(33 150 243 / 10%)"
        : "0 2px 14px 0 rgb(32 40 45 / 8%)";

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderColor: "divider",
          ":hover": {
            boxShadow: boxShadow ? shadow || defaultShadow : "inherit",
          },
          ...sx,
        }}
      >
        {/* Custom card header */}
        {title && (
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {!darkTitle && (
                <Typography variant="h5" component="div">
                  {title}
                </Typography>
              )}
              {darkTitle && (
                <Typography variant="h3" component="div">
                  {title}
                </Typography>
              )}
              {secondary && <Box>{secondary}</Box>}
            </Stack>
          </Box>
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard2;
