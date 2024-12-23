// material-ui
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// ==============================|| LOADER ||============================== //

const LoaderCircular = ({ size }: { size?: number | undefined }) => (
  <Box>
    <CircularProgress color="primary" size={size || 24} />
  </Box>
);

export default LoaderCircular;
