import { useMutation } from "@tanstack/react-query";
import { fetchWithAuth } from "@/services/api";

interface LicenseData {
  license_type: string;
  contract_type: string;
  initial_date: string;
  final_date: string;
  allowed_quantity: string;
  space_quantity: string;
  license_cost: number;
  type_cloud: string;
}

async function createLicense(data: LicenseData) {
  try {
    const response = await fetchWithAuth("/financial/license/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar licença:", error);
    throw error;
  }
}

const useLicense = () => {
  const {
    mutate: createLicenseMutation,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createLicense, // Função que executa a operação
    onSuccess: (data) => {
      console.log("Licença criada com sucesso:", data);
      // Adicione lógica para sucesso (exemplo: mostrar uma mensagem)
    },
    onError: (error: any) => {
      console.error("Erro ao criar licença:", error);
      // Adicione lógica para erro (exemplo: mostrar uma mensagem de erro)
    },
  });

  // Retorna a função `mutate` e os estados de loading, erro e sucesso
  return { createLicenseMutation, isPending, isError, isSuccess };
};

export default useLicense;
