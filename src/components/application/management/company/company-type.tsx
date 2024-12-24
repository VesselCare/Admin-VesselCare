"use client";
// material-ui
import Grid from "@mui/material/Grid2";
import MainCard from "@/components/ui-components/cards/MainCard";
import { FormattedMessage } from "react-intl";
import PhysicalComponent from "./components/physical_component";
import LegalComponent from "./components/legal_component";
import SelectBasicComponentSemControl from "@/components/ui-components/inputs/Select-basic_sem_control";
import { useForm, Controller } from "react-hook-form";

const TypeCliennt = [
  { label: "physical_type", value: "physical" },
  { label: "legal_type", value: "legal" },
];

const CompanyType = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({});

  // Observar o valor selecionado
  const selectedMethod = watch("type_client");

  return (
    <MainCard
      title={
        selectedMethod === "physical" ? (
          <FormattedMessage id="physical_type" />
        ) : (
          <FormattedMessage id="legal_type" />
        )
      }
    >
      <Grid
        container
        spacing={2}
        rowSpacing={10}
        columns={{ xs: 12, sm: 12, md: 12 }}
        columnSpacing={5}
      >
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <Controller
            name="type_client"
            control={control}
            render={() => (
              <SelectBasicComponentSemControl
                name="type_client"
                label="type_client"
                data={TypeCliennt}
                register={register} // Register do react-hook-form
                errors={errors.type_client}
              />
            )}
          />
        </Grid>
        {selectedMethod && (
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            {/* Exibir campos condicionais com base no método selecionado */}
            {selectedMethod === "legal" && (
              <LegalComponent select_type={selectedMethod} />
            )}
            {selectedMethod === "physical" && (
              <PhysicalComponent select_type={selectedMethod} />
            )}
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

export default CompanyType;
