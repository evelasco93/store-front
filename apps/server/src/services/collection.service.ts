import { Collection } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'

export class CollectionServices {
  /**
   * Gets all Collections from the Collections table
   * @returns An array of Collections
   */
  async getAllCollections(): Promise<Collection[]> {
    try {
      const collections = await prisma.collection.findMany()
      return collections
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Gets a single collection from the Collections table
   * @param id The id of the Collection
   * @returns The Collection found with that ID
   */
  async getSingleCollection(id: string): Promise<Collection> {
    try {
      const collection = await prisma.collection.findUnique({ where: { id } })
      if (!collection) {
        throw new CustomError(
          StatusCodes.NOT_FOUND,
          ErrorCodes.NOT_FOUND,
          ErrorMessages.COLLECTION_NOT_FOUND,
        )
      }
      return collection
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Creates a single Collection and inserts it in the database
   * @param data Object with the needed params
   * @returns The created Collection
   */
  async createSingleCollection(data: Collection): Promise<Collection> {
    try {
      const createdCollection = await prisma.collection.create({ data })
      return createdCollection
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }

  /**
   * Updates a single Collection using its ID
   * @param id ID of the collection to be modified
   * @param data Object of parameters to be updated
   * @returns The updated Collection
   */
  async updateSingleCollection(
    id: string,
    data: Collection,
  ): Promise<Collection> {
    try {
      const updatedCollection = await prisma.collection.update({
        where: { id },
        data,
      })
      return updatedCollection
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string,
      )
    }
  }
}
