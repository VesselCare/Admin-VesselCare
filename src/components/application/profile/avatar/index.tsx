import SimpleModal from "@/components/ui-components/modal/simple_modal";
import useAuth from "@/hooks/useAuth";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import AvatarEdit from "./edit_avatat";
import IconImage from "./iconImage";

const AvatarPerfil = () => {
  const { user } = useAuth();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid size={{ xs: 12 }} sx={{ position: "relative" }}>
      <Grid display="flex" justifyContent="center" alignItems="center">
        <Avatar
          alt="User 1"
          src={previewImage || user?.avatar || ""}
          sx={{ width: 100, height: 100, position: "relative" }}
        />
        <IconImage handleOpen={handleOpen} />
      </Grid>
      <SimpleModal
        open={open}
        onClose={handleClose}
        handleOpen={handleOpen}
        width={400}
        height={500}
      >
        <AvatarEdit onClose={handleClose} />
      </SimpleModal>
    </Grid>
  );
};

export default AvatarPerfil;
