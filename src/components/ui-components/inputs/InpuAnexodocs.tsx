import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && onFileUpload) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] }, // Aceita apenas arquivos de imagem
      maxFiles: 1, // Limita a um arquivo por vez
    });

  const preview = acceptedFiles[0]
    ? URL.createObjectURL(acceptedFiles[0])
    : null;

  return (
    <Card
      {...getRootProps()}
      variant="outlined"
      sx={{
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        border: isDragActive ? "2px dashed #3f51b5" : "2px dashed #ccc",
        ":hover": { borderColor: "#3f51b5" },
      }}
    >
      <input {...getInputProps()} />

      {preview ? (
        <Avatar
          src={preview}
          alt="Preview"
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />
      ) : (
        <IconButton color="primary">
          <CloudUploadIcon fontSize="large" />
        </IconButton>
      )}

      <CardContent>
        <Typography variant="body1">
          {isDragActive
            ? "Solte a imagem aqui..."
            : "Arraste uma imagem ou clique para selecionar"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
