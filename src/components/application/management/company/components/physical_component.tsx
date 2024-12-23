import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import AddressCompanyComponent from "./andress";

// Componente para campos ACH
const PhysicalComponent = () => {
  const { control } = useFormContext();

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 12, sm: 12, md: 12 }}
      rowSpacing={10}
      columnSpacing={5}
    >
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.legal_business_name"
          label="legal_business_name"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.doing_business_as"
          label="doing_business_as"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.ein"
          label="ein"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.business_entity_type"
          label="business_entity_type"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.date_of_incorporation"
          label="date_of_incorporation"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.business_phone"
          label="business_phone"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.business_email"
          label="business_email"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.website_url"
          label="website_url"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.registered_agent_name"
          label="registered_agent_name"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.industry"
          label="industry"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="physical.duns_number"
          label="duns_number"
          control={control}
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

export default PhysicalComponent;
