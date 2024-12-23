import Grid from "@mui/material/Grid2";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { useFormContext } from "react-hook-form";

// Componente para campos ACH
const AddressCompanyComponent = () => {
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
          name="street"
          label="street"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="number"
          label="number"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="complement"
          label="complement"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="neighborhood"
          label="neighborhood"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="city"
          label="city"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="state"
          label="state"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="zip_code"
          label="zip_code"
          control={control}
        />
      </Grid>
    </Grid>
  );
};

export default AddressCompanyComponent;
