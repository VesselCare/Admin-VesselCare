import { z } from "zod";
export const schemaLicense = z.object({
  license_type: z.string().min(1, { message: "license_type_is_required" }),
  contract_type: z.string().min(1, { message: "contract_type_is_required" }),
  initial_date: z.string().min(1, { message: "initial_date_is_required" }),
  final_date: z.string().min(1, { message: "final_date_is_required" }),
  allowed_quantity: z
    .string()
    .min(1, { message: "allowed_quantity_is_required" }),
  space_quantity: z.string().min(1, { message: "space_quantity_is_required" }),
  license_cost: z.string().min(1, { message: "license_cost_is_required" }),
  type_cloud: z.string().min(1, { message: "type_cloud_is_required" }),
  status_register: z
    .string()
    .min(1, { message: "status_register_is_required" }),
});

export const license_type = [
  {
    label: "Full",
    value: "full",
  },
  {
    label: "Basic",
    value: "basic",
  },
  {
    label: "Trial",
    value: "trial",
  },
];

export const contract_type = [
  {
    label: "Monthly", // Significa que o contrato é mensal
    value: "monthly",
  },
  {
    label: "Yearly", // Significa que o contrato é anual
    value: "yearly",
  },
  {
    label: "Lifetime", // Significa que o contrato é vitalício
    value: "lifetime",
  },
  {
    label: "Trial", // Significa que o contrato é de teste
    value: "trial",
  },
];

export const allowed_quantity = [
  {
    label: "Unlimited",
    value: "unlimited",
  },
  {
    label: "Limited (1 to 100)",
    value: "limited_1_to_100",
  },
];

export const space_quantity = [
  {
    label: "Unlimited",
    value: "unlimited",
  },
];

export const type_cloud = [
  {
    label: "Shared", // Significa que o armazenamento é compartilhado
    value: "shared",
  },
  {
    label: "Dedicated", // Significa que o armazenamento é dedicado
    value: "dedicated",
  },
];
