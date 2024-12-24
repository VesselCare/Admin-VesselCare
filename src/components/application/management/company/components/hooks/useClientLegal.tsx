import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLegal,
  fetchLegalData,
  updateLegal,
} from "../services/fetchDataLegal";

export interface LegalData {
  license_type: string;
  contract_type: string;
  initial_date: string;
  final_date: string;
  allowed_quantity: string;
  space_quantity: string;
  license_cost: number;
  type_cloud: string;
}

const useClientLegal = () => {
  const queryClient = useQueryClient();

  const id = "1";
  const tenant_id = "1";
  // Gerenciar a recuperação dos dados
  //   const {
  //     data: legalData,
  //     isLoading: isFetching,
  //     isError: isFetchError,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ["legalData"],
  //     queryFn: () => fetchLegalData(id),
  //     enabled: !!id,
  //   });

  // Gerenciar a criação de novos dados
  const {
    mutate: createLegalMutation,
    isPending: isCreating,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationFn: createLegal,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["legalData"] }); // Revalida os dados para sincronizar
      console.log(data);
      return data;
    },
    onError: (error) => {
      console.error("Erro ao criar licença:", error);
    },
  });

  // Gerenciar a atualização de dados existentes
  //   const {
  //     mutate: updateLegalMutation,
  //     isPending: isUpdating,
  //     isError: isUpdateError,
  //     isSuccess: isUpdateSuccess,
  //   } = useMutation({
  //     mutationFn: ({
  //       id,
  //       tenant_id,
  //       data,
  //     }: {
  //       id: string;
  //       tenant_id: string;
  //       data: LegalData;
  //     }) => updateLegal(id, tenant_id, data),
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries({ queryKey: ["legalData"] }); // Revalida os dados para sincronizar
  //     },
  //     onError: (error) => {
  //       console.error("Erro ao atualizar licença:", error);
  //     },
  //   });

  return {
    // legalData,
    // isFetching,
    // isFetchError,
    // refetch,
    createLegalMutation,
    isCreating,
    isCreateError,
    isCreateSuccess,
    // updateLegalMutation,
    // isUpdating,
    // isUpdateError,
    // isUpdateSuccess,
  };
};

export default useClientLegal;
