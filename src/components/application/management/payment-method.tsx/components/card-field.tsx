import Grid from "@mui/material/Grid2";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import StandardBasicDateComponent from "@/components/ui-components/inputs/Standard-basic-Date-component";
import { useFormContext } from "react-hook-form";

const operationType = [
  { label: "debit", value: "debit" },
  { label: "credit", value: "credit" },
];

const cardType = [
  { label: "Visa", value: "visa" },
  { label: "Mastercard", value: "mastercard" },
  { label: "American Express", value: "american_express" },
  { label: "Discover", value: "discover" },
];

// xs e para mobile, sm e para tablet, md e para desktop
// Componente para campos do cartão
const CardFields = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  console.log("errors", errors);
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 12, sm: 12, md: 12 }}
      rowSpacing={10}
      columnSpacing={5}
    >
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <SelectBasicComponent
          name="card.operation_type"
          label="operation_type"
          data={operationType}
          errors={errors}
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <SelectBasicComponent
          name="card.brand_card"
          label="brand_card"
          data={cardType}
          errors={errors}
          control={control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="card.name_on_card"
          label="name_on_card"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="card.number_card"
          label="number_card"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicDateComponent
          name="card.expiration_date"
          label="expiration_date"
          control={control}
          errors={errors}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <StandardBasicComponent
          type="text"
          name="card.security_code"
          label="security_code"
          control={control}
        />
      </Grid>
    </Grid>
  );
};
export default CardFields;
