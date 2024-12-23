// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
// project imports
import Avatar from "@/components/ui-components/extended/Avatar";
import useConfig from "@/hooks/useConfig";

// assets
import { IconCheck } from "@tabler/icons-react";

// color import
import theme1 from "../../scss/_theme1.module.scss";
import theme2 from "../../scss/_theme2.module.scss";
import theme3 from "../../scss/_theme3.module.scss";
import theme4 from "../../scss/_theme4.module.scss";
import theme5 from "../../scss/_theme5.module.scss";
import theme6 from "../../scss/_theme6.module.scss";
import colors from "../../scss/_themes-vars.module.scss";

// types
import { PresetColor, ThemeMode } from "@/types/config";

interface PresetColorProps {
  id: PresetColor;
  primary: string;
  secondary: string;
}

interface Props {
  color: PresetColorProps;
  presetColor: PresetColor;
  setPresetColor: (presetColor: PresetColor) => void;
}

// ==============================|| CUSTOMIZATION - COLOR ||============================== //

const PresetColorBox = ({ color, presetColor, setPresetColor }: Props) => (
  <Grid item>
    <Avatar
      color="inherit"
      size="md"
      sx={{
        width: 48,
        height: 48,
        background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
        opacity: presetColor === color.id ? 0.6 : 1,
        cursor: "pointer",
      }}
      onClick={() => setPresetColor(color?.id!)}
    >
      {presetColor === color.id ? <IconCheck color="#fff" size={28} /> : " "}
    </Avatar>
  </Grid>
);

const PresetColorPage = () => {
  const theme = useTheme();
  const { presetColor, onChangePresetColor } = useConfig();

  const colorOptions: PresetColorProps[] = [
    {
      id: "default",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? colors.darkPrimaryMain || "#000000"
          : colors.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? colors.darkSecondaryMain || "#000000"
          : colors.secondaryMain || "#FFFFFF",
    },
    {
      id: "theme1",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? theme1.darkPrimaryMain || "#000000"
          : theme1.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? theme1.darkSecondaryMain || "#000000"
          : theme1.secondaryMain || "#FFFFFF",
    },
    {
      id: "theme2",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? theme2.darkPrimaryMain || "#000000"
          : theme2.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? theme2.darkSecondaryMain || "#000000"
          : theme2.secondaryMain || "#FFFFFF",
    },
    {
      id: "theme3",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? theme3.darkPrimaryMain || "#000000"
          : theme3.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? theme3.darkSecondaryMain || "#000000"
          : theme3.secondaryMain || "#FFFFFF",
    },
    {
      id: "theme4",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? theme4.darkPrimaryMain || "#000000"
          : theme4.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? theme4.darkSecondaryMain || "#000000"
          : theme4.secondaryMain || "#FFFFFF",
    },
    {
      id: "theme5",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? theme5.darkPrimaryMain || "#000000"
          : theme5.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? theme5.darkSecondaryMain || "#000000"
          : theme5.secondaryMain || "#FFFFFF",
    },
    {
      id: "theme6",
      primary:
        theme.palette.mode === ThemeMode.DARK
          ? theme6.darkPrimaryMain || "#000000"
          : theme6.primaryMain || "#FFFFFF",
      secondary:
        theme.palette.mode === ThemeMode.DARK
          ? theme6.darkSecondaryMain || "#000000"
          : theme6.secondaryMain || "#FFFFFF",
    },
  ];

  return (
    <Stack spacing={1} px={2} pb={2}>
      <Typography variant="h5">
        <FormattedMessage id="preset-color" />
      </Typography>
      <Grid container spacing={1.5} alignItems="center">
        {colorOptions.map((color, index) => (
          <PresetColorBox
            key={index}
            color={color}
            presetColor={presetColor}
            setPresetColor={onChangePresetColor}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default PresetColorPage;
