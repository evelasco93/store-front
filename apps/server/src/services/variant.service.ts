import { Option, Variant } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class VariantServices {
  /**
   * Gets all Variants from the Variants table
   * @returns An array of Variants
   */
  async getAllVariants(): Promise<Variant[]> {
    try {
      return await prisma.variant.findMany()
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Gets a single Variant using its ID
   * @param id ID of the Variant
   * @returns The details of the Variant
   */
  async getSingleVariant(id: string): Promise<Variant> {
    const variant = await prisma.variant.findUnique({ where: { id } })

    if (!variant) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        ErrorCodes.NOT_FOUND,
        ErrorMessages.VARIANT_NOT_FOUND,
      )
    }

    return variant
  }

  /**
   * Gets the Option Values for a single Variant
   * @param variantId The ID of the Variant
   * @returns An array of Options for the specific Variant
   */
  async getVariantOptions(variantId: string): Promise<Option[]> {
    try {
      return await prisma.option.findMany({ where: { variantId } })
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Creates a single Variant
   * @param productId ID of the Product that this Variant is for
   * @returns The created Variant
   */
  async createSingleVariant(data: Variant): Promise<Variant> {
    try {
      return await prisma.variant.create({ data })
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }
}
