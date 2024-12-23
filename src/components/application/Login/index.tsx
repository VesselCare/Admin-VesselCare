"use client";

import Link from "next/link";

import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import AuthCardWrapper from "@/components/ui-components/AuthCardWrapper";
import AuthWrapper1 from "@/components/ui-components/AuthWrapper1";
import Logo2 from "@/components/ui-components/Logo2";
import JWTLogin from "../auth-forms/AuthLogin";

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        sx={{ minHeight: "100vh" }}
      >
        <Grid size={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            sx={{ minHeight: "calc(100vh - 50px)" }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}
            >
              <Grid>
                <Link
                  href="/"
                  aria-label="logo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Logo2 />
                </Link>
              </Grid>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid size={12}>
                    <Grid
                      container
                      direction={{ xs: "column-reverse", md: "row" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color="secondary.main"
                            gutterBottom
                            variant={downMD ? "h3" : "h2"}
                          >
                            Administrative vesselcare
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="12px"
                            textAlign={{ xs: "center", md: "inherit" }}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid size={12}>
                    {/* <JWTLogin/> */}
                    <JWTLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
              <Grid size={12}>
                <Grid container direction="column" alignItems="center">
                  <Typography
                    component={Link}
                    color="secondary"
                    href="#"
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                  >
                    Forgot your password?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} sx={{ m: 3, mt: 1 }}>
          <span>FOOTER</span>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
