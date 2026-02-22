import { z } from "zod"
import { TAG_COLORS, type TagColor } from "../types/tag"

export const createTagSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(30),
  color: z.enum(TAG_COLORS as [TagColor, ...TagColor[]]),
  description: z.string().max(60),
})

export type CreateTagFormData = z.infer<typeof createTagSchema>
