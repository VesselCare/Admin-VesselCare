import ButtonBasicComponent from '@/components/ui-components/button/animation-button';
import useAuth from '@/hooks/useAuth';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from './salve_imagem';

const Input = styled('input')({
  display: 'none',
});

interface AvatarEditProps {
  onClose: () => void;
}

const AvatarEdit = ({ onClose }: AvatarEditProps) => {
  const { user } = useAuth();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

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

  const handleSave = async () => {
    if (!previewImage || !showCropper) return;
    
    const image = document.querySelector('img') as HTMLImageElement;
    if (!image) return;
  
    try {
      const croppedBlob = await getCroppedImg(image, crop);
      const croppedImageUrl = URL.createObjectURL(croppedBlob);
      setPreviewImage(croppedImageUrl);
      setShowCropper(false);
      // Aqui você pode enviar o blob para seu servidor

      console.log(croppedBlob)
    } catch (e) {
      console.error('Erro ao cortar imagem:', e);
    }
  };

  // Limpar URL do objeto ao desmontar o componente
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleAvatarClick = () => {
    document.getElementById('avatar-input')?.click();
  };

  const handleRemoveAvatar = () => {
    setPreviewImage(null);
    setShowCropper(false);
    console.log('removeu')
  };

  const handleCreateCrop = () => {
    setShowCropper(true);
  };

  const handleCancel = () => {
    setShowCropper(false);
    setPreviewImage(user?.avatar || '');
  };


  return (
    <>
    <Grid sx={{padding: 2}}>
        <Grid 
            size={{xs: 12}} 
            display="flex" 
            alignItems="center"
            sx={{ 
                width: '100%',
                position: 'relative'
            }}
        >
            <Typography 
                sx={{
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'center'
                }} 
                variant="h3"
            >
                Foto de perfil
            </Typography>

            <IconButton 
                onClick={onClose}
                sx={{ 
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
            >
                <CloseIcon />
            </IconButton>
        </Grid>
        <Divider sx={{marginBottom: 2, marginTop: 2}} />
        <Grid 
            size={{xs: 12}} 
            display="flex" 
            justifyContent="center" 
            alignItems="center"
            sx={{
                marginTop: 4,
                flexDirection: 'column',
            }}
        >
            <Input 
            accept="image/*"
            id="avatar-input"
            type="file"
            onChange={handleImageChange}
          />
          
          {showCropper && previewImage ? (
             <div style={{ maxWidth: '100%', width: '300px' }}>
             <ReactCrop
               crop={crop}
               onChange={(c) => setCrop(c)}
               aspect={1}
               circularCrop
             >
               <img 
                 src={previewImage} 
                 alt="Crop preview" 
                 style={{ maxWidth: '100%' }}
               />
             </ReactCrop>
             <ButtonBasicComponent
                title="Salvar"
                onClick={handleCreateCrop}
                position="left"
            />
            <ButtonBasicComponent
                title="Cancelar"
                onClick={handleCancel}
                position="right"
            />

           </div>
          ) : (
            <Avatar 
              onClick={handleAvatarClick}
              alt="User 1" 
              src={previewImage || user?.avatar || ''} 
              sx={{ width: 200, height: 200, cursor: 'pointer' }}
            />
          )}
        </Grid>
        <Grid size={{xs: 12}} 
            container justifyContent="center" 
            alignItems="center"
            spacing={1}
            sx={{
                marginTop: 4
            }}
        >
            <Grid>
                <ButtonBasicComponent
                        title="Salvar"
                        onClick={handleSave}
                        position="left"
                    />
                </Grid>
                <Grid>
                    <ButtonBasicComponent
                        title="Remover"
                        onClick={handleRemoveAvatar}
                        position="right"
                    />
                </Grid>
            </Grid>
        </Grid>
    </>
  );
};

export default AvatarEdit;