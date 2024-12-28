// utils/api.ts lado do client

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const { body, headers: customHeaders, ...restOptions } = options;

    // Define os headers da requisição
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

    console.log("response", response);

    // Lidar com status 204 (No Content)
    if (
      response.status === 204 ||
      response.headers.get("Content-Length") === "0"
    ) {
      return null; // Retorna null para respostas sem corpo
    }

    // Verifica se a resposta foi bem-sucedida (status 2xx)
    if (response.ok) {
      try {
        return await response.json(); // Tenta parsear o JSON
      } catch (error) {
        console.warn("Resposta sem JSON, mas bem-sucedida.");
        return null; // Retorna null para respostas bem-sucedidas sem JSON
      }
    }

    // Lidar com status 401 (não autenticado)
    if (response.status === 401) {
      window.location.href = "/login";
      throw new Error("Não autenticado.");
    }

    // Para outros status de erro, extrai a mensagem de erro do JSON e lança uma exceção
    try {
      const errorData = await response.json();
      throw errorData;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  } catch (error: any) {
    throw error;
  }
};
