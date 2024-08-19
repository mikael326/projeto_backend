import { Router, Request, Response } from 'express'

import userController from '@/controllers/userController'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = Router()

router.get('/users', userController.getUsers)

router.get('/user/:id', userController.getUserById)
router.put('/user/:id', authMiddleware, userController.updateUser)
router.delete('/user/:id', authMiddleware, userController.deleteUser)

router.post('/login', userController.loginUser)
router.post('/register', userController.createUser)

router.get('/users-test', (req: Request, res: Response) =>
  res.json({ ok: 'ok' })
)

// Outras rotas...

export { router as userRouter }
