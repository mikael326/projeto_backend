import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '@/config/database'
import { CreateUser, User, createUserSchema, userSchema } from '@/models/User'

class UserService {
  async createUser(data: CreateUser): Promise<User> {
    const validatedData = createUserSchema.parse(data) // Validação aqui

    // email já cadastrado
    const emailExists = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })
    if (emailExists) {
      throw new Error('E-mail já está em uso.')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    return await prisma.user.create({
      data: { ...validatedData, password: hashedPassword },
    })
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        surname: true,
        email: true,
      },
    })
  }

  // Outros métodos de serviço...
  async getUserById(id: number): Promise<Partial<User> | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        surname: true,
        email: true,
      },
    })
  }

  async updateUser(id: number, data: Partial<User>): Promise<void> {
    const validatedData = userSchema.partial().parse(data)

    await prisma.user.update({
      where: { id },
      data: validatedData,
    })
  }

  async deleteUser(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      // Gerar o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' } // Expiração do token, aqui configurado para 1 hora
      )

      return { user, token }
    }

    return null
  }
}

export default new UserService()
