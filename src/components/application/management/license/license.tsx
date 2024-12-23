"use client";
// material-ui
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { FormProvider, useForm } from "react-hook-form";
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

// Tipo para filtrar os dados
type LicenseData = z.infer<typeof schemaLicense>;

const LicenseDataBasic = () => {
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
      status_register: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("New Company", data);
    alert(JSON.stringify(data));
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
                disabled={!methods.formState.isValid}
              />
            </Box>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default LicenseDataBasic;
