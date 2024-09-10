import { Option } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class OptionServices {
  /**
   * Gets all the options available for all Variants from the Options table
   * @returns An array of Variant Options
   */
  async getAllOptions(): Promise<Option[]> {
    try {
      const options = await prisma.option.findMany({
        include: { variant: { include: { options: true } } },
      })
      return options
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Gets the option values for a single Option
   * @param id Of the Option object
   * @returns Option values
   */
  async getSingleOption(id: string): Promise<Option> {
    try {
      const option = await prisma.option.findUnique({
        where: { id },
        include: {
          variant: {
            include: { options: true },
          },
        },
      })
      if (!option) {
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          ErrorCodes.NOT_FOUND,
          ErrorMessages.OPTION_NOT_FOUND,
        )
      }
      return option
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Creates a single option for a variant
   * @param data size, stock and variantId
   * @returns the new option for the variant
   */
  async createVariantOption(data: Option): Promise<Option> {
    try {
      const createOption = await prisma.option.create({
        data,
      })
      return createOption
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Updates the values of a single Option
   * @param id ID of the Option to modify
   * @param data Object of parameters to update
   * @returns The updated Option values
   */
  async updateSingleOption(id: string, data: Option): Promise<Option> {
    try {
      const updatedOption = await prisma.option.update({
        where: { id },
        data,
      })
      return updatedOption
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Delete a single Option using its ID
   * @param id ID of the Option to delete
   * @returns The deleted Option values
   */
  async deleteSingleOption(id: string): Promise<Option> {
    try {
      const deletedOption = await prisma.option.delete({ where: { id } })
      return deletedOption
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }
}
