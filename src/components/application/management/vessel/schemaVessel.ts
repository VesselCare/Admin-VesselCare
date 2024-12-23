import { z } from "zod";

export const schemaVessel = z.object({
    company_name: z.string().min(1, { message: 'Company name is required' }),
    name_vessel: z.string().min(1, { message: 'Name is required' }),
    flag: z.string().min(1, { message: 'Flag is required' }),
    imo_number: z.string().min(1, { message: 'IMO Number is required' }),
    port_of_registry: z.string().min(1, { message: 'Port of Registry is required' }),
    mmsi_number: z.string().min(1, { message: 'MMSI Number is required' }),
    call_sign: z.string().min(1, { message: 'Call Sign is required' }),
    loa: z.string().min(1, { message: 'LOA is required' }),
});

export const CompanyNameVessel = [
    {label: 'Company Name', value: 'company_name' },
    {label: 'Name Vessel', value: 'name_vessel' },
]   