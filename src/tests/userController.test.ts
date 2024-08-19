import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import app from '@/app.js'
import { prisma } from '@/config/database.js'

describe('User Controller', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany() // Limpa todos os usuários antes de começar os testes
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create a new user', async () => {
    const res = await request(app).post('/api/v1/register').send({
      firstname: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.email).toBe('johndoe@example.com')
  })

  it('should not create a user with an existing email', async () => {
    const res = await request(app).post('/api/v1/register').send({
      firstname: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toBe('E-mail já está em uso.')
  })
})
