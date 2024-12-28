import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useTheme } from "@mui/material/styles";
interface IconImageProps {
  handleOpen: () => void;
}

const IconImage = ({ handleOpen }: IconImageProps) => {
  const theme = useTheme();
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        width: 100,
        height: 100,
      }}
    >
      <label htmlFor="icon-button-file">
        <IconButton
          onClick={handleOpen}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            color: theme.palette.secondary[400],
            width: "100%",
            height: "25%",
            borderRadius: "0",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </Grid>
  );
};

export default IconImage;
