"use client";
// material-ui
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import CardFields from "./components/card-field";
import BankFields from "./components/bank-transfer";
import ACHFields from "./components/ach-fields";
import BilletFields from "./components/billet-fields";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import Box from "@mui/material/Box";
import {
  LicenseClient,
  methodPayment,
  schemaACH,
  schemaBankTransfer,
  schemaBillet,
  schemaCard,
  schemaMethodSelection,
} from "./schema_method";
import MainCard from "@/components/ui-components/cards/MainCard";
import { z } from "zod";
import { useEffect, useState } from "react";

// Schema para cada método de pagamento
const methodSchemas = {
  card: schemaCard as z.ZodType<any, any, any>,
  bank_transfer: schemaBankTransfer as z.ZodType<any, any, any>,
  ach: schemaACH as z.ZodType<any, any, any>,
  billet: schemaBillet as z.ZodType<any, any, any>,
};

// Tipo para filtrar os dados
type FilteredData = {
  license_client: string;
  method: string;
  card?: {
    operation_type: string;
    name_on_card: string;
    number_card: string;
    expiration_date: string;
    security_code: string;
    brand_card: string;
  };
  bank_transfer?: {
    bank_name: string;
    bank_code: string;
    swift_code: string;
    account_number: string;
    account_type: string;
  };
  ach?: { bank_code: string; account_number: string; account_type: string };
  billet?: { description: string };
};

const PaymentMethodBasic = ({
  onFormChange,
}: {
  onFormChange: (dirty: boolean) => void;
}) => {
  const [currentSchema, setCurrentSchema] = useState<
    | z.ZodType<any, any, any> // Tipo genérico para os schemas Zod
    | typeof schemaMethodSelection
  >(schemaMethodSelection);

  // Formulário principal
  const methods = useForm({
    resolver: zodResolver(currentSchema as z.ZodType<any, any, any>),
    defaultValues: {
      license_client: "",
      method: "",
    },
  });

  // Observar o valor do método selecionado
  const selectedMethod = useWatch({
    control: methods.control,
    name: "method",
  });

  // Observar alterações no formulário
  const watchAllFields = useWatch({ control: methods.control });

  // Verificar se o formulário foi alterado
  useEffect(() => {
    const isDirty = Object.values(watchAllFields).some((value) => !!value);
    onFormChange(isDirty);
  }, [watchAllFields, onFormChange]);

  // Atualizar o schema com base no método selecionado
  useEffect(() => {
    const newSchema =
      methodSchemas[selectedMethod as keyof typeof methodSchemas] ||
      schemaMethodSelection;
    setCurrentSchema(newSchema);
    methods.reset({ method: selectedMethod }, { keepValues: true }); // Limpar os valores existentes ao mudar o método
  }, [selectedMethod]);

  // Função para filtrar os dados com base no método selecionado
  const onSubmit = (data: any) => {
    const filteredData: FilteredData = {
      license_client: data.license_client,
      method: data.method,
    };

    switch (data.method) {
      case "card":
        filteredData.card = data.card;
        break;
      case "bank_transfer":
        filteredData.bank_transfer = data.bank_transfer;
        break;
      case "ach":
        filteredData.ach = data.ach;
        break;
      case "billet":
        filteredData.billet = data.billet;
        break;
      default:
        break;
    }

    console.log("Filtered Data:", filteredData);
    alert(`Filtered Data: ${JSON.stringify(filteredData)}`);
  };

  return (
    <MainCard title="payment_method">
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
                name="method"
                label="method"
                data={methodPayment}
                errors={methods.formState.errors}
              />
            </Grid>
            {selectedMethod && (
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                {/* Exibir campos condicionais com base no método selecionado */}
                {selectedMethod === "card" && <CardFields />}
                {selectedMethod === "bank_transfer" && <BankFields />}
                {selectedMethod === "ach" && <ACHFields />}
                {selectedMethod === "billet" && <BilletFields />}
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

export default PaymentMethodBasic;
