"use client";
// material-ui
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Box from "@mui/material/Box";
import { z } from "zod";
import { schemaUserCompany } from "./schema_user";
import StandardBasicDateComponent from "@/components/ui-components/inputs/Standard-basic-Date-component";
import MainCard from "@/components/ui-components/cards/MainCard";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import { CompanyNameVessel } from "../vessel/schemaVessel";
import { useEffect } from "react";

// Tipo para filtrar os dados
type LicenseData = z.infer<typeof schemaUserCompany>;

const UserAdminCompany = ({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) => {
  const methods = useForm<LicenseData>({
    resolver: zodResolver(schemaUserCompany),
    defaultValues: {
      email: "",
      last_name: "",
      middle_name: "",
      first_name: "",
      birth_date: "",
      phone_number: "",
      ssn: "",
    },
  });

  // Observar alterações no formulário
  const watchAllFields = useWatch({ control: methods.control });

  // Verificar se o formulário foi alterado
  useEffect(() => {
    const isDirty = Object.values(watchAllFields).some((value) => !!value);
    onFormChange(isDirty);
  }, [watchAllFields, onFormChange]);

  const onSubmit = (data: any) => {
    console.log("New Company", data);
    alert(data);
  };

  return (
    <MainCard title="User Admin Company">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={5}
            rowSpacing={8}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <SelectBasicComponent
                name="company_name"
                label="company_name"
                control={methods.control}
                data={CompanyNameVessel}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicComponent
                name="email"
                label="email"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicComponent
                name="last_name"
                label="last_name"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicComponent
                name="middle_name"
                label="middle_name"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicComponent
                name="first_name"
                label="first_name"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicDateComponent
                name="birth_date"
                label="birth_date"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicComponent
                name="phone_number"
                label="phone_number"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <StandardBasicComponent
                name="ssn"
                label="ssn"
                control={methods.control}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Box>
                <ButtonBasicComponent
                  type="submit"
                  title="submit_button"
                  position="left"
                  disabled={!methods.formState.isValid}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </MainCard>
  );
};

export default UserAdminCompany;
