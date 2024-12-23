import { z } from 'zod';

export const schemaUserCompany = z.object({
    email: z.string().min(1, { message: 'Email is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    middle_name: z.string().min(1, { message: 'Middle name is required' }),
    first_name: z.string().min(1, { message: 'First name is required' }),
    birth_date: z.string().min(1, { message: 'Birth date is required' }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
    ssn: z.string().min(1, { message: 'SSN is required' }),
});
