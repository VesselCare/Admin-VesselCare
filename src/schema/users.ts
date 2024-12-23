import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const schemaUsers = z.object({
  avatar: z.any(),
  firstname: z.string().min(3, { message: "firstname_is_required" }),
  middlename: z.string().min(3, { message: "middlename_is_required" }),
  lastname: z.string().min(3, { message: "lastname_is_required" }),
  birthdate: z.string().min(1, { message: "birthdate_is_required" }),
  username: z.string().min(3, { message: "username_is_required" }),
  email: z.string().email({ message: "email_is_required" }),
  phone: z.string().refine((val) => isValidPhoneNumber(val || ""), {
    message: "phone_is_required",
  }),
  role: z.string().min(1, { message: "role_is_required" }),
  ssn: z.string().min(1, { message: "ssn_is_required" }),
});
