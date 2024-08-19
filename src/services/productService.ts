import { prisma } from '@/config/database'
import { productSchema, Product } from '@/models/Product'

class ProductService {
  async getAllProducts(query: any) {
    const {
      limit = 12,
      page = 1,
      fields,
      match,
      category_ids,
      'price-range': priceRange,
      option,
    } = query

    const where: any = {}

    if (match) {
      where.OR = [
        { name: { contains: match, mode: 'insensitive' } },
        { description: { contains: match, mode: 'insensitive' } },
      ]
    }

    if (category_ids) {
      where.categories = {
        some: {
          id: {
            in: category_ids.split(',').map(Number),
          },
        },
      }
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number)
      where.price = { gte: minPrice, lte: maxPrice }
    }

    if (option) {
      where.options = {
        some: {
          id: Object.keys(option).map(Number),
          values: { hasSome: option[Object.keys(option)[0]] },
        },
      }
    }

    const total = await prisma.product.count({ where })
    const products = await prisma.product.findMany({
      where,
      take: limit === '-1' ? undefined : parseInt(limit, 10),
      skip: limit === '-1' ? undefined : (page - 1) * parseInt(limit, 10),
      include: {
        images: true,
        options: true,
      },
    })

    return {
      data: products,
      total,
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
    }
  }

  async getProductById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: { images: true, options: true },
    })
  }

  async createProduct(data: Product) {
    // Valida os dados recebidos
    const validatedData = productSchema.parse(data)

    // Cria o produto
    const product = await prisma.product.create({
      data: {
        enabled: validatedData.enabled,
        name: validatedData.name,
        slug: validatedData.slug,
        useInMenu: validatedData.useInMenu,
        stock: validatedData.stock,
        description: validatedData.description,
        price: validatedData.price,
        priceWithDiscount: validatedData.priceWithDiscount,
        categories: {
          connect: validatedData.categoryIds?.map((id) => ({ id })),
        },
        images: {
          create: validatedData.images?.map((image) => ({
            enabled: image.enabled,
            path: image.content, // Simula o caminho da imagem aqui
          })),
        },
        options: {
          create: validatedData.options?.map((option) => ({
            title: option.title,
            shape: option.shape,
            radius: option.radius,
            type: option.type,
            values: option.values,
          })),
        },
      },
    })

    return product
  }

  async updateProduct(id: number, data: Product) {
    const validatedData = productSchema.parse(data)

    // Atualiza o produto
    const product = await prisma.product.update({
      where: { id },
      data: {
        enabled: validatedData.enabled,
        name: validatedData.name,
        slug: validatedData.slug,
        useInMenu: validatedData.useInMenu,
        stock: validatedData.stock,
        description: validatedData.description,
        price: validatedData.price,
        priceWithDiscount: validatedData.priceWithDiscount,
        categories: {
          set: validatedData.categoryIds?.map((id) => ({ id })),
        },
        images: {
          update: validatedData.images
            ?.filter((image) => image.id)
            .map((image) => ({
              where: { id: image.id },
              data: {
                enabled: image.enabled,
                path: image.content, // Atualiza o caminho da imagem
              },
            })),
          deleteMany: validatedData.images
            ?.filter(
              (image) => image.id === undefined && image.content === null
            )
            .map((image) => ({ id: image.id })),
        },
        options: {
          update: validatedData.options
            ?.filter((option) => option.id)
            .map((option) => ({
              where: { id: option.id },
              data: {
                title: option.title,
                shape: option.shape,
                radius: option.radius,
                type: option.type,
                values: option.values,
              },
            })),
          deleteMany: validatedData.options
            ?.filter(
              (option) => option.id === undefined && option.values === null
            )
            .map((option) => ({ id: option.id })),
        },
      },
    })

    return product
  }

  async deleteProduct(id: number) {
    return await prisma.product.delete({ where: { id } })
  }
}

export default new ProductService()
