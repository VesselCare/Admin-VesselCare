import { z } from "zod";

export const schemaAddress = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  number: z.string().min(1, { message: "Number is required" }),
  complement: z.string(),
  neighborhood: z.string().min(1, { message: "Neighborhood is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip_code: z.string().min(1, { message: "Zip code is required" }),
});

export const schemaLegal = z.object({
  legal_business_name: z
    .string()
    .min(3, { message: "Legal business name is required" }), // Nome da empresa
  doing_business_as: z
    .string()
    .min(3, { message: "Doing business as is required" }), // Razão Social
  ein: z.string().min(3, { message: "EIN is required" }), // CNPJ
  business_entity_type: z.string(),
  // Tipo de empresa
  date_of_incorporation: z.string(),
  business_phone: z.string().min(1, { message: "Business phone is required" }), // Telefone da empresa
  business_email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Business email is required" }), // Email da empresa
  website_url: z.string(), // URL do site
  registered_agent_name: z.string(), // Nome do agente registrado
  industry: z.string(), // Indústria
  duns_number: z.string().min(1, { message: "DUNS number is required" }), // Número DUNS
});

export const schemaPhysical = z.object({
  legal: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    document_id: z.string().min(1, { message: "Document ID is required" }),
    document_type: z.string().min(1, { message: "Document type is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    status_enum: z.string().min(1, { message: "Status enum is required" }),
  }),
});

export const defaultValues = {
  type_client: "physical", // Valor inicial para o tipo de cliente
  physical: {
    legal_business_name: "",
    doing_business_as: "",
    ein: "",
    business_entity_type: "",
    date_of_incorporation: "",
    business_phone: "",
    business_email: "",
    website_url: "",
    registered_agent_name: "",
    industry: "",
    duns_number: "",
  },
  legal: {
    name: "",
    document_id: "",
    document_type: "",
    phone: "",
    email: "",
    status_enum: "",
  },
};

export const TypeCliennt = [
  { label: "physical", value: "physical" },
  { label: "legal", value: "legal" },
];

export const LicenseClient = [
  { label: "Client 1", value: "client_1" },
  { label: "Client 2", value: "client_2" },
  { label: "Client 3", value: "client_3" },
];

export const StatusEnum = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];
