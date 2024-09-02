import { Option } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class OptionServices {
  async getAllOptions(): Promise<Option[]> {
    try {
      const options = await prisma.option.findMany()
      return options
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  async getSingleOption(id: string): Promise<Option> {
    try {
      const option = await prisma.option.findUnique({ where: { id } })
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
