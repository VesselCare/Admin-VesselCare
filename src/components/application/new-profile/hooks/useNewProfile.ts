"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/services/api";

export interface ProfileProps {
  avatar?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birth_date: string | null;
  username: string;
  email: string;
  password?: string;
  phone: string;
  ssn: string;
  user_type: string;
  user_id?: string;
  role: string;
}

const useNewProfile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<string[]>({
    queryKey: ["roles"],
    queryFn: () => fetchWithAuth("/permissions/roles", { method: "GET" }),
  });

  // Mapeia os dados para o formato esperado pelo SelectBasicComponent
  const user_type = data?.map((role) => ({
    label: role,
    value: role,
  }));

  // Criar o mutation para salvar as permissões com a formData pois tem o arquivo
  const {
    mutate: saveProfile,
    isPending,
    error: saveProfileError,
    isSuccess,
  } = useMutation({
    mutationFn: async (formData: FormData) => {
      // Realiza a requisição com o FormData para incluir o avatar e os demais campos
      return fetchWithAuth("/users/register", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  //console.log(user_type)

  return {
    data,
    isLoading,
    error,
    user_type,
    saveProfile,
    isPending,
    saveProfileError,
    isSuccess,
  };
};

export default useNewProfile;
