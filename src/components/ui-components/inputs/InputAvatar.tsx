import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useController } from "react-hook-form";
import { FormattedMessage } from "react-intl";

const AvatarUploader = ({ name, control }: { name: string; control: any }) => {
  const { field } = useController({ name, control });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        field.onChange(file); // Atualiza o campo com o arquivo selecionado
      }
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const preview = field.value ? URL.createObjectURL(field.value) : null;

  // Limpa o URL para evitar vazamento de memória
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Box
      {...getRootProps()}
      sx={{
        position: "relative",
        width: 120,
        height: 120,
        borderRadius: "50%",
        border: isDragActive ? "3px dashed #3f51b5" : "3px dashed #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        ":hover": { borderColor: "#3f51b5" },
        transition: "border-color 0.3s ease",
      }}
    >
      <input {...getInputProps()} />

      {preview ? (
        <Avatar
          src={preview}
          alt="Preview"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : (
        <Box
          sx={{
            textAlign: "center",
            color: isDragActive ? "#3f51b5" : "#aaa",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
        </Box>
      )}
      <Typography variant="caption">
        <FormattedMessage id="avatar_uploader_message" />
      </Typography>
    </Box>
  );
};

export default AvatarUploader;
