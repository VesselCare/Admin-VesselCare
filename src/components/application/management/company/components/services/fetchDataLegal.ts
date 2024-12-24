import { fetchWithAuth } from "@/services/api";
import { LegalData } from "../hooks/useClientLegal";

// Função para buscar os dados existentes
export async function fetchLegalData(id: string) {
  try {
    const response = await fetchWithAuth(`/companies/client-legal/${id}/list`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar licença:", error);
    throw error;
  }
}

// Função para criar um novo registro
export async function createLegal(data: LegalData) {
  try {
    const response = await fetchWithAuth("/companies/client-legal/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar licença:", error);
    throw error;
  }
}

// Função para atualizar um registro existente
export async function updateLegal(
  id: string,
  tenant_id: string,
  data: LegalData
) {
  try {
    const response = await fetchWithAuth(
      `/companies/client-legal/${id}/${tenant_id}/update`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar licença:", error);
    throw error;
  }
}
