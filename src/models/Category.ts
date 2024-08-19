import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'O nome da categoria é obrigatório.'),
  slug: z.string().min(1, 'O slug é obrigatório.'),
  useInMenu: z.boolean().optional(), // Pode ser opcional se tiver valor padrão
})

export type Category = z.infer<typeof categorySchema>
