"use client";
// project imports
import Profile from "./components/profileInput";
import Grid from "@mui/material/Grid2";
import MainCard from "@/components/ui-components/cards/MainCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaUsers } from "@/schema/users";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import { gridSpacing } from "@/store/constant";
import useNewProfile, { ProfileProps } from "./hooks/useNewProfile";
import { FormattedMessage } from "react-intl";
import { useEffect } from "react";

// ==============================|| PROFILE 1 ||============================== //

const NewProfileVesselcare = () => {
  const { saveProfile, isPending, saveProfileError, isSuccess } =
    useNewProfile();

  const methods = useForm({
    resolver: zodResolver(schemaUsers),
    defaultValues: {
      avatar: null,
      firstname: "",
      middlename: "",
      lastname: "",
      birthdate: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      ssn: "",
    },
  });

  // Função para enviar os dados para o backend
  const onSubmit = async (data: any) => {
    // Crie o objeto conforme o esperado pelo backend, excluindo o avatar
    const dataToSend: ProfileProps = {
      first_name: data.firstname,
      middle_name: data.middlename,
      last_name: data.lastname,
      birth_date: data.birthdate || "",
      username: data.username,
      email: data.email,
      phone: data.phone,
      ssn: data.ssn,
      user_type: data.role,
      role: data.role,
    };

    // Inicialize o FormData e adicione todos os campos de `dataToSend`
    const formData = new FormData();
    Object.entries(dataToSend).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Adicione o avatar ao FormData se ele estiver presente
    if (data.avatar) {
      formData.append("avatar", data.avatar); // chave "avatar" deve corresponder à esperada pelo backend
    }

    // Enviar para o backend
    saveProfile(formData);
  };

  // Limpar os campos do formulário após sucesso
  useEffect(() => {
    if (isSuccess) {
      methods.reset();
    }
  }, [isSuccess]);

  return (
    <MainCard>
      <Stack spacing={2} sx={{ mb: 2 }}>
        {saveProfileError && (
          <Alert severity="error">{saveProfileError.message}</Alert>
        )}
        {isPending && (
          <Alert severity="info">
            <FormattedMessage id="loading_message" />
          </Alert>
        )}
        {isSuccess && (
          <Alert severity="success">
            <FormattedMessage id="success_message" />
          </Alert>
        )}
      </Stack>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={gridSpacing}>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Profile methods={methods} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <ButtonBasicComponent
                    type="submit"
                    disabled={isPending}
                    title="submit_button"
                    position="left"
                    loading={isPending}
                  />
                </Grid>
                {/* <Grid size={6}>
                  <ButtonOutlineComponent  title="cancel_button" disabled={isPending} onClick={() => {}} position="right" />
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </MainCard>
  );
};

export default NewProfileVesselcare;
