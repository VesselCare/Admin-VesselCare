// app/api/proxy/[...path].ts / Funcao coringa para fazer as requisições para o backend

import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";

// Configurações de Ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!; // URL do seu backend
const REFRESH_ENDPOINT = process.env.REFRESH_TOKEN_ENDPOINT!; // Endpoint para renovar tokens

// Função para renovar o accessToken usando o refreshToken
async function renewAccessToken(): Promise<boolean> {
  const cookieStore = await cookies();
  try {
    const response = await axios.post(
      `${API_BASE_URL}${REFRESH_ENDPOINT}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      cookieStore.set("accessToken", response.data.accessToken); // Atualiza o token
      return true;
    }
    return false;
  } catch (error: any) {
    console.error("Erro ao renovar accessToken:", error);
    return false;
  }
}

// Função principal para lidar com as requisições
async function handleProxy(req: NextRequest, path: string[], method: string) {
  //console.log(`Proxy recebendo requisição: ${method} /${path.join('/')}`);

  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;

  // Construir a URL da API backend
  const apiUrl = `${API_BASE_URL}/${path.join("/")}`;
  //console.log(`Proxy encaminhando para: ${apiUrl}`);

  // Configurar os headers, anexando o accessToken se disponível
  const headers: Record<string, string> = {};

  // Copiar todos os headers da requisição original, exceto 'host'
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") {
      headers[key] = value;
    }
  });

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // Preparar o corpo da requisição, se aplicável
  // Preparar o corpo da requisição
  let body: any = null;
  if (method !== "GET" && method !== "DELETE") {
    const contentType = req.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      try {
        body = await req.json();
      } catch (error) {
        console.error("Erro ao ler o corpo JSON da requisição:", error);
        return NextResponse.json(
          { message: "Corpo JSON da requisição inválido." },
          { status: 400 }
        );
      }
    } else {
      // Para outros tipos de conteúdo, como multipart/form-data
      try {
        body = await req.arrayBuffer();
        body = Buffer.from(body);
      } catch (error) {
        console.error("Erro ao ler o corpo da requisição:", error);
        return NextResponse.json(
          { message: "Erro ao ler o corpo da requisição." },
          { status: 400 }
        );
      }
    }
  }

  // Configuração da requisição axios
  const axiosConfig: AxiosRequestConfig = {
    url: apiUrl,
    method: method as AxiosRequestConfig["method"],
    headers: headers,
    data: body,
    withCredentials: true, // Envia cookies automaticamente
  };

  try {
    // Fazer a requisição para o backend
    const apiResponse: AxiosResponse = await axios(axiosConfig);
    //console.log(`Resposta do backend (${apiResponse.status}):`, apiResponse.data);

    // Retornar a resposta do backend para o cliente
    return NextResponse.json(apiResponse.data, { status: apiResponse.status });
  } catch (error: any) {
    if (error.response && error.response.status === 401 && accessToken) {
      console.warn("AccessToken expirado. Tentando renovar...");
      // Se o accessToken expirou, tentar renovar
      const refreshed = await renewAccessToken();

      if (refreshed) {
        // Recuperar o novo accessToken dos cookies
        accessToken = cookieStore.get("accessToken")?.value;

        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
          //console.log('Tentando a requisição novamente com o novo accessToken.');

          try {
            // Repetir a requisição original com o novo accessToken
            const retryResponse: AxiosResponse = await axios({
              ...axiosConfig,
              headers: headers,
            });
            //console.log(`Resposta após renovação (${retryResponse.status}):`, retryResponse.data);
            return NextResponse.json(retryResponse.data, {
              status: retryResponse.status,
            });
          } catch (retryError: any) {
            console.error(
              "Erro na segunda tentativa da requisição:",
              retryError
            );
            return NextResponse.json(
              { message: "Erro na requisição após renovação do token." },
              { status: retryError.response?.status || 500 }
            );
          }
        }
      }

      // Se não foi possível renovar, redirecionar para login
      console.warn(
        "Não foi possível renovar accessToken. Redirecionando para login."
      );
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Outros erros
    //console.log('error.response', error.response.data);
    console.error("Erro na requisição proxy:", error);
    return NextResponse.json(
      { message: error.response.data },
      { status: error.response?.status || 500 }
    );
  }
}

// Exportar funções para cada método HTTP
export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path, "GET");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path, "POST");
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path, "PUT");
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxy(req, params.path, "DELETE");
}