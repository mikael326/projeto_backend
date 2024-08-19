import { z } from 'zod'

// Esquema para criação de usuários (sem 'id')
export const createUserSchema = z.object({
  firstname: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, 'a senha deve conter ao menos 8 caracteres.'),
})

// Esquema para validação de usuários completos (com 'id')
export const userSchema = z.object({
  id: z.number().int(),
  firstname: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

export type User = z.infer<typeof userSchema>
export type CreateUser = z.infer<typeof createUserSchema>
