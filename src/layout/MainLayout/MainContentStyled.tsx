"use client";

// material-ui
import { styled } from "@mui/material";

// project-import
import { drawerWidth } from "@/store/constant";

// types
import { MenuOrientation, ThemeMode } from "@/types/config";

interface MainStyleProps {
  open: boolean;
  menuOrientation: MenuOrientation;
  borderRadius: number;
}

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled("main", {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "borderRadius" && prop !== "menuOrientation",
})<MainStyleProps>(({ theme, open, menuOrientation, borderRadius }) => ({
  backgroundColor:
    theme.palette.mode === ThemeMode.DARK
      ? theme.palette.dark[800]
      : theme.palette.grey[100],
  minWidth: "1%",
  width: "100%",
  minHeight: "calc(100vh - 88px)",
  flexGrow: 1,
  padding: 20,
  marginTop: 88,
  marginRight: 20,
  borderRadius: `${borderRadius}px`,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...(menuOrientation === MenuOrientation.VERTICAL && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter + 200,
    }),
    marginLeft: open ? 0 : -(drawerWidth - 72),
    width: `calc(100% - ${drawerWidth}px)`,
  }),
  [theme.breakpoints.down("md")]: {
    marginLeft: 20,
    padding: 16,
    marginTop: 88,
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

export default MainContentStyled;
