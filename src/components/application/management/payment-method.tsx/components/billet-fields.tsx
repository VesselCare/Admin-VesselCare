import Grid from "@mui/material/Grid2";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { useFormContext } from "react-hook-form";

const BilletFields = () => {
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
          name="billet.description"
          label="description"
          control={control}
        />
      </Grid>
    </Grid>
  );
};

export default BilletFields;
