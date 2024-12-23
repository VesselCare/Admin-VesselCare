// material-ui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// ==============================|| LOADER ||============================== //

interface LoaderProps {
  size?: number;
}

const Loader = ({ size }: LoaderProps) => (
  <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1301, width: '100%' }}>
    <LinearProgress color="primary" sx={{ height: size }} />
  </Box>
);

export default Loader;
