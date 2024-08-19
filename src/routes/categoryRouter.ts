import { Router } from 'express'
import categoryController from '@/controllers/categoryController'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = Router()

router.get('/search', categoryController.search)
router.get('/:id', categoryController.getById)
router.post('/', authMiddleware, categoryController.create)
router.put('/:id', authMiddleware, categoryController.update)
router.delete('/:id', authMiddleware, categoryController.delete)

export { router as categoryRouter }
