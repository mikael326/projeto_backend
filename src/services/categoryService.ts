import { prisma } from '@/config/database'
import { categorySchema, Category } from '@/models/Category'

class CategoryService {
  async getAllCategories(query: any) {
    const { limit = 12, page = 1, fields, use_in_menu } = query

    const where =
      use_in_menu !== undefined ? { useInMenu: use_in_menu === 'true' } : {}
    const select = fields
      ? Object.fromEntries(
          fields.split(',').map((field: string) => [field, true])
        )
      : undefined

    const total = await prisma.category.count({ where })
    const categories = await prisma.category.findMany({
      where,
      select,
      take: limit === '-1' ? undefined : parseInt(limit, 10),
      skip: limit === '-1' ? undefined : (page - 1) * parseInt(limit, 10),
    })

    return {
      data: categories,
      total,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
    }
  }

  async getCategoryById(id: number) {
    return await prisma.category.findUnique({ where: { id } })
  }

  async createCategory(data: Category) {
    const validatedData = categorySchema.parse(data)
    return await prisma.category.create({ data: validatedData })
  }

  async updateCategory(id: number, data: Category) {
    const validatedData = categorySchema.parse(data)
    return await prisma.category.update({ where: { id }, data: validatedData })
  }

  async deleteCategory(id: number) {
    return await prisma.category.delete({ where: { id } })
  }
}

export default new CategoryService()
