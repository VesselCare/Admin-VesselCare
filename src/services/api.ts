// utils/api.ts lado do client

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const { body, headers: customHeaders, ...restOptions } = options;

    const headers: Record<string, string> = {
      ...Object.fromEntries(Object.entries(customHeaders || {})),
    };

    // Se o Content-Type não estiver definido e o body não for FormData, defina como 'application/json'
    if (!headers["Content-Type"] && !(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`/api/proxy/${endpoint}`, {
      ...restOptions,
      headers,
      body,
      credentials: "include", // Garante que os cookies sejam enviados
    });

    // Se a resposta for bem-sucedida (status 2xx), retorne os dados JSON diretamente
    if (response.ok) {
      return await response.json();
    }

    // Lidar com status 401 (não autenticado)
    if (response.status === 401) {
      window.location.href = "/login";
      throw new Error("Não autenticado.");
    }

    // Para outros status de erro, extrai a mensagem de erro do JSON e lança uma exceção
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro na requisição.");
  } catch (error: any) {
    console.error("Erro na requisição com autenticação:", error);
    throw new Error(error.message || "Erro desconhecido.");
  }
};
