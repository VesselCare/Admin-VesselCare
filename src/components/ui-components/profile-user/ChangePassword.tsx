// material-ui

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// project imports
import SubCard from "../cards/SubCard";
import AnimateButton from "../extended/AnimateButton";
import { gridSpacing } from "@/store/constant";

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard title="Change Password">
          <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="outlined-basic7"
                  fullWidth
                  label="Current Password"
                />
              </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="outlined-basic8"
                  fullWidth
                  label="New Password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="password"
                  id="outlined-basic9"
                  fullWidth
                  label="Confirm Password"
                />
              </Grid>
            </Grid>
          </form>
          <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid item>
              <AnimateButton>
                <Button variant="contained">Change Password</Button>
              </AnimateButton>
            </Grid>
            <Grid item>
              <Button sx={{ color: "error.main" }}>Clear</Button>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
