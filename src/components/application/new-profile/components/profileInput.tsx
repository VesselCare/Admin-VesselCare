"use client";

import Grid from "@mui/material/Grid2";
import SubCard from "@/components/ui-components/cards/SubCard";
import PhoneInputComponent from "@/components/ui-components/inputs/PhoneInputComponent";
import SelectBasicComponent from "@/components/ui-components/inputs/Select-basic-component";
import StandardBasicComponent from "@/components/ui-components/inputs/Standard-basic-component";
import useNewProfile from "../hooks/useNewProfile";
import AvatarUploader from "@/components/ui-components/inputs/InputAvatar";
import DataInputComponent from "@/components/ui-components/inputs/DataInput-component";

const Profile = ({ methods }: { methods: any }) => {
  const { isLoading, error, user_type } = useNewProfile();

  //console.log("Profile", data)
  return (
    <SubCard title="Profile">
      <Grid
        container
        spacing={{ xs: 3, md: 6, lg: 6 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <AvatarUploader name="avatar" control={methods.control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StandardBasicComponent
            type="text"
            name="firstname"
            label="firstname"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StandardBasicComponent
            type="text"
            name="middlename"
            label="middlename"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StandardBasicComponent
            type="text"
            name="lastname"
            label="lastname"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <DataInputComponent
            type="date"
            name="birthdate"
            label="birthdate"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StandardBasicComponent
            type="text"
            name="username"
            label="username"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StandardBasicComponent
            type="email"
            name="email"
            label="email"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <SelectBasicComponent
            name="role"
            label="role"
            data={user_type || []}
            errors={methods.formState.errors}
            isLoading={isLoading}
            error={error?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StandardBasicComponent
            type="text"
            name="ssn"
            label="ssn"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <PhoneInputComponent name="phone" label="phone" />
        </Grid>
      </Grid>
    </SubCard>
  );
};

export default Profile;
