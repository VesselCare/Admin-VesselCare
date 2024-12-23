import Grid from "@mui/material/Grid2";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { useFormContext } from "react-hook-form";
import { StatusEnum } from "../schemaCompany";
import AddressCompanyComponent from "./andress";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

// Componente para campos ACH
const LegalComponent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 12, sm: 12, md: 12 }}
      rowSpacing={10}
      columnSpacing={5}
    >
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="legal.name"
          label="name"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="legal.document_id"
          label="document_id"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="legal.document_type"
          label="document_type"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="legal.phone"
          label="phone"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="email"
          name="legal.email"
          label="email"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <SelectBasicComponent
          name="legal.status_enum"
          label="status_enum"
          data={StatusEnum}
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <Typography variant="h4">
          <FormattedMessage id="address" />
        </Typography>
      </Grid>
      <AddressCompanyComponent />
    </Grid>
  );
};

export default LegalComponent;
