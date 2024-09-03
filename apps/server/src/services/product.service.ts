import { Product } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class ProductServices {
  /**
   * Gets all Products with its variants and option values for those variants from the Products table
   * @returns An array of Products
   */
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

  /**
   * Gets a single Product using its ID
   * @param id ID of the product
   * @returns The Product details
   */
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

  /**
   * Creates a single Product
   * @param data Object with the needed parameters to create a Product
   * @returns The created Product
   */
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

  /**
   * Update a single Product using its ID
   * @param id ID of the Product to update
   * @param data Object with the parameters to update
   * @returns The updated Product
   */
  async updateSingleProduct(id: string, data: Product): Promise<Product> {
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

  /**
   * Delete a single Product using its ID
   * @param id ID of the Product to delete
   * @returns The details of the deleted Product
   */
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
