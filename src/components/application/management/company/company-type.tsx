"use client";
// material-ui
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import Box from "@mui/material/Box";
import {
  schemaPhysical,
  schemaLegal,
  TypeCliennt,
  LicenseClient,
  defaultValues,
} from "./schemaCompany";
import MainCard from "@/components/ui-components/cards/MainCard";
import { z } from "zod";
import { useEffect, useState } from "react";
import PhysicalComponent from "./components/physical_component";
import LegalComponent from "./components/legal_component";
import { FormattedMessage } from "react-intl";

// Schema para cada método de pagamento
const methodSchemas = {
  physical: schemaPhysical as z.ZodType<any, any, any>,
  legal: schemaLegal as z.ZodType<any, any, any>,
};

const CompanyType = () => {
  const [currentSchema, setCurrentSchema] = useState<
    z.ZodType<any, any, any> // Tipo genérico para os schemas Zod
  >(schemaPhysical);

  // Formulário principal
  const methods = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: defaultValues,
  });

  // Observar o valor do método selecionado
  const selectedMethod = useWatch({
    control: methods.control,
    name: "type_client", // Observar o valor do método selecionado
  });

  // Atualizar o schema com base no método selecionado
  useEffect(() => {
    const newSchema =
      methodSchemas[selectedMethod as keyof typeof methodSchemas] ||
      schemaPhysical;
    setCurrentSchema(newSchema);
    methods.reset({ type_client: selectedMethod }, { keepValues: true }); // Limpar os valores existentes ao mudar o método
  }, [selectedMethod]);

  // Função para filtrar os dados com base no método selecionado
  const onSubmit = (data: any) => {
    alert(`Data: ${JSON.stringify(data)}`);
  };

  return (
    <MainCard title={<FormattedMessage id="company_type" />}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            rowSpacing={10}
            columns={{ xs: 12, sm: 12, md: 12 }}
            columnSpacing={5}
          >
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <SelectBasicComponent
                name="license_client"
                label="license_client"
                data={LicenseClient}
                errors={methods.formState.errors}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <SelectBasicComponent
                name="type_client"
                label="type_client"
                data={TypeCliennt}
                errors={methods.formState.errors}
              />
            </Grid>
            {selectedMethod && (
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                {/* Exibir campos condicionais com base no método selecionado */}
                {selectedMethod === "physical" && <PhysicalComponent />}
                {selectedMethod === "legal" && <LegalComponent />}
              </Grid>
            )}
          </Grid>
          <Box sx={{ mt: 10 }}>
            <ButtonBasicComponent
              type="submit"
              title="submit_button"
              position="left"
              disabled={!methods.formState.isValid}
            />
          </Box>
        </form>
      </FormProvider>
    </MainCard>
  );
};

export default CompanyType;
