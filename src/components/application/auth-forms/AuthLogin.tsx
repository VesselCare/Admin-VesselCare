import React, { useState } from "react";
// material-ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

// assets
import AnimateButton from "@/components/ui-components/extended/AnimateButton";
import LoaderCircular from "@/components/ui-components/LoaderCircular";
import LoadingScreen from "@/components/ui-components/LoadingScreen";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { z } from "zod";
// Define o esquema de validação com zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // Novo estado
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()!;
  };

  // Função para limpar erros ao digitar
  const handleInputChange = (field: keyof z.infer<typeof schema>) => () => {
    clearErrors(field);
  };

  const handleLogin = async (data: z.infer<typeof schema>) => {
    setIsLoggedIn(true);
    try {
      await login(data.email, data.password);
      setIsRedirecting(true); // Mostra o carregamento de redirecionamento
      reset();
    } catch (error: any) {
      alert(error.message || "Falha no login");
      console.error("Login failed:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoggedIn(false);
    }
  };

  if (isRedirecting) {
    // Exibe um componente de carregamento personalizado enquanto redireciona
    return <LoadingScreen />;
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Grid container spacing={2}>
        <FormControl fullWidth>
          <OutlinedInput
            id="outlined-adornment-email-login"
            type="email"
            {...register("email")}
            placeholder="Email Address / Username"
            value="wrf.wellington@gmail.com"
            size="small"
            onChange={handleInputChange("email")}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </FormControl>

        <FormControl fullWidth>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            size="small"
            {...register("password")}
            onChange={handleInputChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </FormControl>
      </Grid>
      {/* <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Keep me logged in"
          />
        </Grid>
      </Grid> */}
      <Box sx={{ mt: 5 }}>
        <AnimateButton>
          <Button
            color="secondary"
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            disabled={isLoggedIn}
          >
            {isLoggedIn ? <LoaderCircular size={24} /> : "Sign In"}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
};

export default JWTLogin;
