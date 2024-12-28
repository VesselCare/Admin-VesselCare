// Remove caracteres especiais do número de telefone
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[-() ]/g, "");
}

//Transformar todas as letras para maiúsculas
export function toUpperCase<T>(data: T): T {
  if (typeof data === "string") {
    return data.toUpperCase() as T; // Converte para maiúsculas se for string
  }

  if (Array.isArray(data)) {
    return data.map((item) => toUpperCase(item)) as T; // Chamada recursiva para arrays
  }

  if (typeof data === "object" && data !== null) {
    const newData: any = {};
    Object.keys(data).forEach((key) => {
      newData[key] = toUpperCase((data as any)[key]); // Chamada recursiva para objetos
    });
    return newData as T;
  }

  return data; // Retorna o valor original para outros tipos (números, booleanos, etc.)
}

// Função auxiliar para converter Blob para Base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
