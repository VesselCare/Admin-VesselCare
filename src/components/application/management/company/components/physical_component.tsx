import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import StandardBasicSemControlComponent from "@/components/ui-components/inputs/Standard-basic-sem-control";
import { useForm } from "react-hook-form";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaPhysical, StatusEnum } from "../schemaCompany";
import { z } from "zod";
import SelectBasicComponentSemControl from "@/components/ui-components/inputs/Select-basic_sem_control";

export type PhysicalType = z.infer<typeof schemaPhysical>;

const PhysicalComponent = ({ select_type }: { select_type: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhysicalType>({
    resolver: zodResolver(schemaPhysical),
    defaultValues: {
      legal: {
        name: "",
        document_id: "",
        document_type: "",
        phone: "",
        email: "",
        status_enum: "",
      },
    },
  });

  const onSubmit = (data: PhysicalType) => {
    alert(`Dados enviados: ${select_type}`);
    alert(`Dados enviados: ${JSON.stringify(data)}`);
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
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="legal.name"
            label="name"
            register={register}
            errors={errors.legal?.name}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="legal.document_id"
            label="document_id"
            register={register}
            errors={errors.legal?.document_id}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="legal.document_type"
            label="document_type"
            register={register}
            errors={errors.legal?.document_type}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <StandardBasicSemControlComponent
            type="text"
            name="legal.phone"
            label="phone"
            register={register}
            errors={errors.legal?.phone}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <StandardBasicSemControlComponent
            type="email"
            name="legal.email"
            label="email"
            register={register}
            errors={errors.legal?.email}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 5 }}>
          <SelectBasicComponentSemControl
            name="legal.status_enum"
            label="status_enum"
            data={StatusEnum}
            register={register}
            errors={errors.legal?.status_enum}
          />
        </Grid>
        <Box sx={{ mt: 10 }}>
          <ButtonBasicComponent
            type="submit"
            title="submit_button"
            position="left"
          />
        </Box>
      </Grid>
    </form>
  );
};

export default PhysicalComponent;
