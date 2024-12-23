"use client";

import { cloneElement, ReactElement } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";

// project imports
import Logo from "../Logo";

// types
import { ThemeMode } from "@/types/config";

// elevation scroll
interface ElevationScrollProps {
  children: ReactElement<{ style?: React.CSSProperties }>;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  });

  return cloneElement(children, {
    style: {
      backgroundColor:
        theme.palette.mode === ThemeMode.DARK && trigger
          ? theme.palette.dark[800]
          : theme.palette.background.default,
      color: theme.palette.text.dark,
    },
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
            <Typography sx={{ flexGrow: 1, textAlign: "left" }}>
              <Logo />
            </Typography>
            <Stack
              direction="row"
              sx={{ display: { xs: "none", sm: "block" } }}
              spacing={{ xs: 1.5, md: 2.5 }}
            >
              <Button color="inherit" component={Link} href="#" target="_blank">
                Documentation
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
