// material-ui
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// project imports
import useConfig from "@/hooks/useConfig";
import LogoSection from "../LogoSection";
import FullScreenSection from "./FullScreenSection";
import LocalizationSection from "./LocalizationSection";
import MobileSection from "./MobileSection";
import NotificationSection from "./NotificationSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons-react";

// types
import { handlerDrawerOpen, useGetMenuMaster } from "@/api/menu";
import { MenuOrientation, ThemeMode } from "@/types/config";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

  return (
    <>
      {/* logo & toggler button */}
      <Box sx={{ width: downMD ? "auto" : 228, display: "flex" }}>
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        {!isHorizontal && (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              overflow: "hidden",
              transition: "all .2s ease-in-out",
              bgcolor:
                theme.palette.mode === ThemeMode.DARK
                  ? "dark.main"
                  : "secondary.light",
              color:
                theme.palette.mode === ThemeMode.DARK
                  ? "secondary.main"
                  : "secondary.dark",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === ThemeMode.DARK
                    ? "secondary.main"
                    : "secondary.dark",
                color:
                  theme.palette.mode === ThemeMode.DARK
                    ? "secondary.light"
                    : "secondary.light",
              },
            }}
            onClick={() => handlerDrawerOpen(!drawerOpen)}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="20px" />
          </Avatar>
        )}
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <NotificationSection />
      </Box>

      {/* live customization & localization */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <LocalizationSection />
      </Box>

      {/* full sceen toggler */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <FullScreenSection />
      </Box>

      {/* profile */}
      <ProfileSection />

      {/* mobile header */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
