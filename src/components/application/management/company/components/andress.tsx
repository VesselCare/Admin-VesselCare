import Grid from "@mui/material/Grid2";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import { useForm } from "react-hook-form";

import { useWatch } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema para cada método de pagamento
const schema = z.object({
  street: z.string(),
});

interface AddressCompanyComponentProps {
  onFormChange: (dirty: boolean) => void;
}

// Componente para campos ACH
const AddressCompanyComponent = ({
  onFormChange,
}: AddressCompanyComponentProps) => {
  // Formulário principal
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type_client: "",
    },
  });

  // Observar alterações no formulário
  const watchAllFields = useWatch({ control: methods.control });

  // Verificar se o formulário foi alterado
  useEffect(() => {
    const isDirty = Object.values(watchAllFields).some((value) => !!value);
    onFormChange(isDirty);
  }, [watchAllFields, onFormChange]);

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
          control={methods.control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="number"
          label="number"
          control={methods.control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="complement"
          label="complement"
          control={methods.control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="neighborhood"
          label="neighborhood"
          control={methods.control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="city"
          label="city"
          control={methods.control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="state"
          label="state"
          control={methods.control}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StandardBasicComponent
          type="text"
          name="zip_code"
          label="zip_code"
          control={methods.control}
        />
      </Grid>
    </Grid>
  );
};

export default AddressCompanyComponent;
