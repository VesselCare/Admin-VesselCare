export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  dialCode: string;
  mask: string; // Máscara de telefone
}

export const countries: Country[] = [
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    mask: "(#0) 00000-0000",
  },

  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    mask: "(#00) 00000-0000",
  },
];
