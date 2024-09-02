import { Product } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class ProductServices {
  async getAllProducts(): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        include: {
          variants: {
            include: {
              options: { select: { color: true, size: true, stock: true } },
            },
          },
        },
      })
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  async getSingleProduct(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            options: { select: { color: true, size: true, stock: true } },
          },
        },
      },
    })

    if (!product) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        ErrorCodes.NOT_FOUND,
        ErrorMessages.PRODUCT_NOT_FOUND,
      )
    }

    return product
  }

  async createSingleProduct(data: Product): Promise<Product> {
    try {
      return await prisma.product.create({ data })
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  async updateProduct(id: string, data: Product): Promise<Product> {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
      })

      if (!updatedProduct) {
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          ErrorCodes.NOT_FOUND,
          ErrorMessages.PRODUCT_NOT_FOUND,
        )
      }

      return updatedProduct
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  async deleteSingleProduct(id: string): Promise<Product> {
    try {
      const deletedProduct = await prisma.product.delete({ where: { id } })

      if (!deletedProduct) {
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          ErrorCodes.NOT_FOUND,
          ErrorMessages.PRODUCT_NOT_FOUND,
        )
      }

      return deletedProduct
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }
}
