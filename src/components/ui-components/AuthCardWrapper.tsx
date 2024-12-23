// material-ui
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
// project import
import MainCard, { MainCardProps } from "./cards/MainCard";

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }: MainCardProps) => {
  const theme = useTheme();
  return (
    <MainCard
      sx={{
        maxWidth: { xs: 350, lg: 400 },
        margin: { xs: 1, md: 1 },
        background: theme.palette.background.paper,
        "& > *": {
          flexGrow: 1,
          flexBasis: "50%",
        },
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
};

export default AuthCardWrapper;
