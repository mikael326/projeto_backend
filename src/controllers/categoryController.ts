import { Request, Response } from 'express'
import categoryService from '@/services/categoryService'
import { successResponse, errorResponse } from '@/utils/response'

export class CategoryController {
  async search(req: Request, res: Response) {
    try {
      const result = await categoryService.getAllCategories(req.query)
      return successResponse(res, result)
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const category = await categoryService.getCategoryById(
        Number(req.params.id)
      )
      if (!category)
        return res.status(404).json({ message: 'Categoria não encontrada.' })
      return successResponse(res, category)
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.createCategory(req.body)
      return res.status(201).json(category)
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      await categoryService.updateCategory(Number(req.params.id), req.body)
      return res.status(204).send()
    } catch (error) {
      return errorResponse(res, error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await categoryService.deleteCategory(Number(req.params.id))
      return res.status(204).send()
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}

export default new CategoryController()
