import { Request, Response } from 'express'
import productService from '@/services/productService'
import { successResponse, errorResponse } from '@/utils/response'

export class ProductController {
  async search(req: Request, res: Response) {
    try {
      const result = await productService.getAllProducts(req.query)
      return successResponse(res, result)
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(Number(req.params.id))
      if (!product)
        return res.status(404).json({ message: 'Produto não encontrado.' })
      return successResponse(res, product)
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body)
      return res.status(201).json(product)
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      await productService.updateProduct(Number(req.params.id), req.body)
      return res.status(204).send()
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await productService.deleteProduct(Number(req.params.id))
      return res.status(204).send()
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}

export default new ProductController()
