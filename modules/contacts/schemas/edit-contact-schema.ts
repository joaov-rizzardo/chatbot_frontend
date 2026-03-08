import { z } from "zod"

export const editContactSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100),
  lastName: z.string().max(100),
  email: z.string().email("E-mail inválido").or(z.literal("")),
})

export type EditContactFormData = z.infer<typeof editContactSchema>
