"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/services/api";
import { PermissionsInterface, UpdatedPermission } from "../type";

const usePermissions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<PermissionsInterface>({
    queryKey: ["permissions"],
    queryFn: () => fetchWithAuth("api/v1/permissions", { method: "GET" }),
  });

  // Criar o mutation para salvar as permissões
  const {
    mutate: savePermissions,
    isPending,
    error: savePermissionsError,
  } = useMutation({
    mutationFn: (permissions: UpdatedPermission[]) =>
      fetchWithAuth("api/v1/permissions/create-or-update", {
        method: "POST",
        body: JSON.stringify(permissions),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    savePermissions,
    isPending,
    savePermissionsError,
  };
};

export default usePermissions;
