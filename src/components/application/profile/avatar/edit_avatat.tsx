import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import useAuth from "@/hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "./salve_imagem";
import IconImage from "./iconImage";
import { fetchWithAuth } from "@/services/api";
import { blobToBase64 } from "@/utils/function_aux";
import { useAlert } from "@/components/ui-components/alert/alert_suspense";
import { useAvatar } from "./useAvatar";

const Input = styled("input")({
  display: "none",
});

interface AvatarEditProps {
  onClose: () => void;
}

const AvatarEdit = ({ onClose }: AvatarEditProps) => {
  const { user } = useAuth();
  const { updateAvatar, isSuccess, handleSuccessRemove } = useAvatar();
  const { showAlert } = useAlert();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 60,
    height: 60,
    x: 0,
    y: 0,
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  console.log("avatar", user?.avatar);

  // Função para alterar a imagem
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para cortar a imagem e deixar ok para ser enviada ao servidor por outra função
  const handleSaveCrop = async () => {
    if (!previewImage || !showCropper) return;

    const image = document.querySelector("img") as HTMLImageElement;
    if (!image) return;

    try {
      const croppedBlob = await getCroppedImg(image, crop);

      const base64 = await blobToBase64(croppedBlob);

      setCroppedImage(base64);
      setShowCropper(false);
    } catch (e) {
      console.error("Erro ao cortar imagem:", e);
    }
  };

  // Função para enviar a imagem cortada ao servidor
  const handleSendToServer = async () => {
    if (croppedImage && user?.id) {
      console.log("Imagem enviada ao servidor:", croppedImage);

      try {
        const base64Data = croppedImage.split(",")[1];

        const payload = {
          data: base64Data,
          filename: "avatar.png",
          mime_type: "image/png",
        };

        updateAvatar({ id: user?.id, payload });
        if (isSuccess) {
          onClose();
        }
      } catch (error) {
        console.error("Erro ao enviar imagem ao servidor:", error);
        showAlert({
          type: "error",
          title: "error",
          message: "error_servidor",
        });
      }
    }
  };

  // Função para remover a imagem do avatar
  const handleRemoveAvatar = async () => {
    setCroppedImage(null);
    setPreviewImage(null);

    if (user?.avatar) {
      // Lógica para remover a imagem do servidor
      try {
        const response = await fetchWithAuth(
          `/users/delete-avatar/${user?.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response === null) {
          handleSuccessRemove(onClose);
          return;
        }

        handleSuccessRemove(onClose);
      } catch (error: any) {
        showAlert({
          type: "error",
          title: "error",
          message: "error_remover",
        });
      }
    }
  };

  // Limpar as URLs das imagens ao desmontar o componente
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
    };
  }, [previewImage, croppedImage]);

  // Função para abrir o input de imagem
  const handleAvatarClick = () => {
    document.getElementById("avatar-input")?.click();
  };

  // Função para cancelar o crop
  const handleCancel = () => {
    setShowCropper(false);
    setPreviewImage(null);
  };

  return (
    <Grid sx={{ padding: 2 }}>
      <Grid
        display="flex"
        alignItems="center"
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            width: "100%",
            textAlign: "center",
          }}
          variant="h3"
        >
          Foto de perfil
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 4,
          flexDirection: "column",
        }}
      >
        <Input
          accept="image/*"
          id="avatar-input"
          type="file"
          onChange={handleImageChange}
        />

        {showCropper && previewImage ? (
          <Grid>
            <div
              style={{
                maxWidth: "100%",
                width: "250px", // Largura máxima para o editor de corte
                height: "350px", // Altura máxima para o editor de corte
                overflow: "hidden", // Para garantir que a imagem não extrapole
              }}
            >
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  src={previewImage}
                  alt="Crop preview"
                  style={{ maxWidth: "100%" }}
                />
              </ReactCrop>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <IconButton onClick={handleSaveCrop} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel} color="secondary">
                <ArrowBackIcon />
              </IconButton>
            </div>
          </Grid>
        ) : (
          <Grid display="flex" justifyContent="center" alignItems="end">
            <Avatar
              alt="User Avatar"
              src={croppedImage || user?.avatar || ""}
              sx={{ width: 200, height: 200 }}
            />

            <IconImage handleOpen={handleAvatarClick} />
          </Grid>
        )}
      </Grid>
      {croppedImage && (
        <Grid container justifyContent="center" sx={{ marginTop: 14 }}>
          <ButtonBasicComponent
            title="submit-button"
            onClick={handleSendToServer}
          />
          <ButtonBasicComponent
            title="remover-button"
            onClick={handleRemoveAvatar}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default AvatarEdit;
