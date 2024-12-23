import Grid from "@mui/material/Grid2";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { useFormContext } from "react-hook-form";

// Componente para campos ACH
const ACHFields = () => {
  const { control } = useFormContext();

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
          name="ach.bank_code"
          label="bank_code"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="ach.account_number"
          label="account_number"
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="ach.account_type"
          label="account_type"
          control={control}
        />
      </Grid>
    </Grid>
  );
};

export default ACHFields;
