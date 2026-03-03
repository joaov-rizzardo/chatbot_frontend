import { z } from "zod"
import { isValidPhoneNumber } from "libphonenumber-js/max"

export const createContactSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100),
  lastName: z.string().max(100),
  phoneNumber: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(
      (val) => {
        try {
          return isValidPhoneNumber(val)
        } catch {
          return false
        }
      },
      { message: "Número de telefone inválido" },
    ),
  email: z.string().email("E-mail inválido").or(z.literal("")),
})

export type CreateContactFormData = z.infer<typeof createContactSchema>
