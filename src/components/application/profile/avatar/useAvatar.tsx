import { useAlert } from "@/components/ui-components/alert/alert_suspense";
import { fetchWithAuth } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

async function handleSendToServer(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/users/update-avatar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.error("Erro ao enviar imagem ao servidor:", error);
    throw error;
  }
}

export const useAvatar = () => {
  const { showAlert } = useAlert();

  // Configuração do useMutation para enviar a imagem ao servidor
  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      handleSendToServer(id, payload),
    onSuccess: (data) => {
      // Exibe um alerta de sucesso ao completar a mutação
      showAlert({
        type: "success",
        title: "success",
        message: "success_servidor",
      });
      console.log("Resposta do servidor:", data);
    },
  });

  const handleSuccessRemove: any = (onClose: () => void) => {
    showAlert(
      {
        type: "success",
        title: "success",
        message: "success_remover",
      },
      "top-right"
    );
    onClose();
  };

  // Retorna as funções e o estado da mutação
  return {
    updateAvatar: mutation.mutate, // Função para disparar a mutação
    updateAvatarAsync: mutation.mutateAsync, // Versão assíncrona da mutação
    isLoading: mutation.isPending, // Estado de carregamento
    isSuccess: mutation.isSuccess, // Estado de sucesso
    isError: mutation.isError, // Estado de erro
    error: mutation.error, // Detalhes do erro
    handleSuccessRemove,
  };
};
