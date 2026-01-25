import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Formato de email inválido'),
    password: z
        .string()
        .min(8, 'Senha precisa ter pelo menos 6 caracteres')
        .max(50, 'Senha muito longa'),
})


export type LoginFormData = z.infer<typeof loginSchema>