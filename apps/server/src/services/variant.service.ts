import { Option, Variant } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class VariantServices {
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

  async createSingleVariant(productId: string): Promise<Variant> {
    try {
      return await prisma.variant.create({ data: { productId } })
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  async createOptionForVariant(data: Option): Promise<Option> {
    try {
      return await prisma.option.create({ data })
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }
}
