import { z } from 'zod';

z.setErrorMap((issue, ctx) => {
  return { message: issue.message || ctx.defaultError };
});


// Schema principal (placeholder para seleção do método)
export const schemaMethodSelection = z.object({
  license_client: z.string().nonempty('License name is required'),
  method: z.string().nonempty('Method is required'),
});

export const schemaCard = z.object({
  method: z.literal('card'),
  card: z.object({
    operation_type: z.string().min(1, { message: 'operation_type_is_required' }), // Debito ou Credito
    name_on_card: z.string().min(1, { message: 'name_on_card_is_required' }), // Nome do titular do cartão
    number_card: z.string().min(1, { message: 'card_number_is_required' }),
    expiration_date: z.string().min(1, { message: 'expiration_date_is_required' }),
    security_code: z.string().min(1, { message: 'security_code_is_required' }),
    brand_card: z.string().min(1, { message: 'brand_card_is_required' })
  })
});

export const schemaBankTransfer = z.object({
  method: z.literal('bank_transfer'),
  bank_transfer: z.object({
    bank_name: z.string().min(1, { message: 'account_number_is_required' }),
    bank_code: z.string().min(1, { message: 'bank_name_is_required' }),
    swift_code: z.string().min(1, { message: 'swift_code_is_required' }),
    account_number: z.string().min(1, { message: 'account_number_is_required' }),
    account_type: z.string().min(1, { message: 'account_type_is_required' })
  })
});

export const schemaACH = z.object({
  method: z.literal('ach'),
  ach: z.object({
    bank_code: z.string().min(1, { message: 'account_number_is_required' }),
    account_number: z.string().min(1, { message: 'ach_routing_is_required' }),
    account_type: z.string().min(1, { message: 'account_type_is_required' })
  })
});

export const schemaBillet = z.object({
  method: z.literal('billet'),
  billet: z.object({
    description: z.string().min(1, { message: 'description_is_required' })
  })
});

export const LicenseClient = [
  { label: 'Client 1', value: 'client_1' },
  { label: 'Client 2', value: 'client_2' },
  { label: 'Client 3', value: 'client_3' },
];

export const methodPayment = [
  {
    label: 'billet', // boleto
    value: 'billet' // boleto
  },
  {
    label: 'card', // cartão de crédito
    value: 'card' // cartão de crédito/Debit Card
  },
  {
    label: 'bank_transfer', // Transferência bancária
    value: 'bank_transfer'
  },
  {
    label: 'ach', // Transferência bancária automática
    value: 'ach'
  }
];
