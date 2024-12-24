"use client";
// material-ui
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Box from "@mui/material/Box";
import {
  allowed_quantity,
  contract_type,
  license_type,
  schemaLicense,
  space_quantity,
  type_cloud,
} from "./schemaLicense";
import { z } from "zod";
import StandardBasicDateComponent from "@/components/ui-components/inputs/Standard-basic-Date-component";
import { useEffect } from "react";
import useLicense from "./useLicense";

// Tipo para filtrar os dados
export type LicenseData = z.infer<typeof schemaLicense>;

const LicenseDataBasic = ({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) => {
  const methods = useForm<LicenseData>({
    resolver: zodResolver(schemaLicense),
    defaultValues: {
      license_type: "",
      contract_type: "",
      initial_date: "",
      final_date: "",
      allowed_quantity: "",
      space_quantity: "",
      license_cost: "",
      type_cloud: "",
    },
  });

  const { createLicenseMutation, isPending } = useLicense();

  // Observar alterações no formulário
  const watchAllFields = useWatch({ control: methods.control });

  // Verificar se o formulário foi alterado
  useEffect(() => {
    const isDirty = Object.values(watchAllFields).some((value) => !!value);
    onFormChange(isDirty);
  }, [watchAllFields, onFormChange]);

  // Enviar os dados para o servidor
  const onSubmit = (data: LicenseData) => {
    const newData = {
      ...data,
      license_cost: Number(data.license_cost),
    };
    try {
      createLicenseMutation(newData);
    } catch (error) {
      console.error("Erro ao criar licença:", error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            rowSpacing={8}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <SelectBasicComponent
                name="license_type"
                label="license_type"
                data={license_type}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <SelectBasicComponent
                name="contract_type"
                label="contract_type"
                data={contract_type}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicDateComponent
                name="initial_date"
                label="initial_date"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicDateComponent
                name="final_date"
                label="final_date"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <SelectBasicComponent
                name="allowed_quantity"
                label="allowed_quantity"
                data={allowed_quantity}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <SelectBasicComponent
                name="space_quantity"
                label="space_quantity"
                data={space_quantity}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <SelectBasicComponent
                name="type_cloud"
                label="type_cloud"
                data={type_cloud}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                type="number"
                name="license_cost"
                label="license_cost"
              />
            </Grid>
            <Box>
              <ButtonBasicComponent
                type="submit"
                title="submit_button"
                position="right"
                loading={isPending}
              />
            </Box>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default LicenseDataBasic;
