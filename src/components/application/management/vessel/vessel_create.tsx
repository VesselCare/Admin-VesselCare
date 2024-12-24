"use client";
// material-ui
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Box from "@mui/material/Box";
import { z } from "zod";
import { CompanyNameVessel, schemaVessel } from "./schemaVessel";
import { useEffect, useState } from "react";

// Tipo para filtrar os dados
type LicenseData = z.infer<typeof schemaVessel>;

const VesselDataBasic = ({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) => {
  const [vessels, setVessels] = useState<LicenseData[]>([]); // Lista de embarcações

  const methods = useForm<LicenseData>({
    resolver: zodResolver(schemaVessel),
    defaultValues: {
      company_name: "",
      name_vessel: "",
      flag: "",
      imo_number: "",
      port_of_registry: "",
      mmsi_number: "",
      call_sign: "",
      loa: "",
    },
  });

  // Adicionar nova embarcação
  const onAddVessel = (data: LicenseData) => {
    setVessels([...vessels, data]); // Adicionar nova embarcação à lista
    methods.reset(); // Limpar o formulário
  };

  // Observar alterações no formulário
  const watchAllFields = useWatch({ control: methods.control });

  // Verificar se o formulário foi alterado
  useEffect(() => {
    const isDirty = Object.values(watchAllFields).some((value) => !!value);
    onFormChange(isDirty);
  }, [watchAllFields, onFormChange]);

  // Submeter todas as embarcações
  const onSubmitAll = () => {
    console.log("All Vessels:", vessels);
    alert(`All Vessels: ${JSON.stringify(vessels)}`);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onAddVessel)}>
          <Grid
            container
            spacing={2}
            rowSpacing={8}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <SelectBasicComponent
                name="company_name"
                label="company_name"
                control={methods.control}
                data={CompanyNameVessel}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                name="name_vessel"
                label="name_vessel"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                name="flag"
                label="flag"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                name="imo_number"
                label="imo_number"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                name="port_of_registry"
                label="port_of_registry"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                name="mmsi_number"
                label="mmsi_number"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                name="call_sign"
                label="call_sign"
                control={methods.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StandardBasicComponent
                type="number"
                name="loa"
                label="loa"
                control={methods.control}
              />
            </Grid>

            <Box sx={{ mt: 2 }}>
              <ButtonBasicComponent
                type="submit"
                title="Add Vessel"
                position="right"
              />
            </Box>
          </Grid>
        </form>
      </FormProvider>

      {/* Exibição das embarcações adicionadas */}
      <Box sx={{ mt: 4 }}>
        <h3>Vessels Added:</h3>
        {vessels.map((vessel, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <p>Company Name: {vessel.company_name}</p>
            <p>Name: {vessel.name_vessel}</p>
            <p>Flag: {vessel.flag}</p>
            <p>IMO Number: {vessel.imo_number}</p>
            <p>Port of Registry: {vessel.port_of_registry}</p>
            <p>MMSI Number: {vessel.mmsi_number}</p>
            <p>Call Sign: {vessel.call_sign}</p>
            <p>LOA: {vessel.loa}</p>
          </div>
        ))}
      </Box>

      {/* Botão para enviar todas as embarcações */}
      <Box sx={{ mt: 4 }}>
        <ButtonBasicComponent
          onClick={onSubmitAll}
          title="Submit All Vessels"
          position="right"
        />
      </Box>
    </>
  );
};

export default VesselDataBasic;
