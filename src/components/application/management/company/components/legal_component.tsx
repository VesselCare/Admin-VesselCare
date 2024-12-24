import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import StandardBasicSemControlComponent from "@/components/ui-components/inputs/Standard-basic-sem-control";
import { schemaLegal } from "../schemaCompany";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInputComponentSemControl from "@/components/ui-components/inputs/PhoneInputComponent_Sem_controler";
import DataInputSemController from "@/components/ui-components/inputs/DataInput_sem_controller";
import { cleanPhoneNumber, toUpperCase } from "@/utils/function_aux";
import useClientLegal, { LegalData } from "./hooks/useClientLegal";
import dayjs from "dayjs";

/*
Dados para teste:
AZIMUT DO BRASIL FABRICACAO 
AZIMUT DO BRASIL FABRICACAO DE IATES LTDA
11.568.948/0001-64
CNAE C-3011-3/01
Sociedade Empresária Limitada (206-2)
Construção de Embarcações e Estruturas Flutuantes
azimutyachts.com.br
Data Abertura
(47) 3405 0505
18/02/2010

localizada na Avenida Teporti, 245 - Cordeiros, Itajai - SC, 88.311-460

*/

export type LegalType = z.infer<typeof schemaLegal>;

// Componente para campos ACH
const LegalComponent = ({ select_type }: { select_type: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LegalType>({
    resolver: zodResolver(schemaLegal), // Usa o esquema específico para validação
    defaultValues: {
      legal_business_name: "AZIMUT DO BRASIL FABRICACAO",
      doing_business_as: "AZIMUT DO BRASIL FABRICACAO DE IATES LTDA",
      ein: "11.568.948/0001-64",
      business_entity_type: "Sociedade Empresária Limitada (206-2)",
      date_of_incorporation: "2010-02-18",
      business_phone: "(47) 3405 0505",
      business_email: "azimutyachts@azimutyachts.com.br",
      website_url: "azimutyachts.com.br",
      registered_agent_name: "", // Não consta no site
      industry: "Construção de Embarcações e Estruturas Flutuantes",
      duns_number: "CNAE C-3011-3/01",
    },
  });

  const { createLegalMutation, isCreating, isCreateError, isCreateSuccess } =
    useClientLegal();

  // Função para enviar os dados
  const onSubmit = async (data: LegalType) => {
    console.log("Dados enviados:", data);

    // Limpar o número de telefone
    const cleanedPhone = cleanPhoneNumber(data.business_phone);
    // Transformar todas as letras para maiúsculas
    const upperCase = toUpperCase(data);

    // Formatar a data de incorporação
    const formattedDate = dayjs(
      data.date_of_incorporation,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");

    const newData = {
      ...upperCase,
      type_client: select_type,
      phone: cleanedPhone,
      date_of_incorporation: formattedDate,
    };

    try {
      createLegalMutation(newData as unknown as LegalData);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao criar licença:", error);
    }

    alert(`Dados enviados: ${JSON.stringify(newData)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        columns={{ xs: 12, sm: 12, md: 12 }}
        rowSpacing={10}
        columnSpacing={5}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="legal_business_name"
            label="legal_business_name"
            register={register}
            errors={errors?.legal_business_name}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="doing_business_as"
            label="doing_business_as"
            register={register}
            errors={errors?.doing_business_as}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="ein"
            label="ein"
            register={register}
            errors={errors?.ein}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="business_entity_type"
            label="business_entity_type"
            register={register}
            errors={errors?.business_entity_type}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DataInputSemController
            name="date_of_incorporation"
            label="date_of_incorporation"
            register={register}
            errors={errors?.date_of_incorporation}
            defaultValue="2010-02-18"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <PhoneInputComponentSemControl
            name="business_phone"
            label="Phone Number"
            register={register}
            errors={errors?.business_phone}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="business_email"
            label="business_email"
            register={register}
            errors={errors?.business_email}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="website_url"
            label="website_url"
            register={register}
            errors={errors?.website_url}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="registered_agent_name"
            label="registered_agent_name"
            register={register}
            errors={errors?.registered_agent_name}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="industry"
            label="industry"
            register={register}
            errors={errors?.industry}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="duns_number"
            label="duns_number"
            register={register}
            errors={errors?.duns_number}
          />
        </Grid>
        <Box sx={{ mt: 10 }}>
          <ButtonBasicComponent
            type="submit"
            title="submit_button"
            position="left"
            loading={isCreating}
          />
        </Box>
      </Grid>
    </form>
  );
};

export default LegalComponent;
