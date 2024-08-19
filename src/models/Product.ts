import { z } from 'zod'

export const productSchema = z.object({
  enabled: z.boolean().default(false),
  name: z.string().min(1, 'O nome do produto é obrigatório.'),
  slug: z.string().min(1, 'O slug é obrigatório.'),
  useInMenu: z.boolean().default(false),
  stock: z.number().min(0, 'O estoque deve ser maior ou igual a 0.'),
  description: z.string().optional(),
  price: z.number().min(0, 'O preço deve ser maior ou igual a 0.'),
  priceWithDiscount: z
    .number()
    .min(0, 'O preço com desconto deve ser maior ou igual a 0.'),
  categoryIds: z.array(z.number().positive()).optional(), // IDs das categorias associadas
  images: z
    .array(
      z.object({
        id: z.number().optional(), // id da imagem existente (opcional para updates)
        enabled: z.boolean().default(false),
        type: z.string().min(1, 'O tipo da imagem é obrigatório.'),
        content: z.string().min(1, 'O conteúdo da imagem é obrigatório.'),
      })
    )
    .optional(),
  options: z
    .array(
      z.object({
        id: z.number().optional(), // id da opção existente (opcional para updates)
        title: z.string().min(1, 'O título da opção é obrigatório.'),
        shape: z.enum(['SQUARE', 'CIRCLE']).default('SQUARE'),
        radius: z.number().optional(),
        type: z.enum(['TEXT', 'COLOR']).default('TEXT'),
        values: z
          .array(z.string())
          .min(1, 'Os valores da opção são obrigatórios.')
          .transform((values) => values.join(',')), // Converte array em string separada por vírgulas
      })
    )
    .optional(),
})

export type Product = z.infer<typeof productSchema>
