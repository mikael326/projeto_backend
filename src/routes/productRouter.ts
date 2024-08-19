import { Router } from 'express'

import productController from '@/controllers/productController'
import { authMiddleware } from '@/middleware/authMiddleware'

const router = Router()

router.get('/search', productController.search)
router.get('/:id', productController.getById)
router.post('/', authMiddleware, productController.create)
router.put('/:id', authMiddleware, productController.update)
router.delete('/:id', authMiddleware, productController.delete)

export { router as productRouter }
