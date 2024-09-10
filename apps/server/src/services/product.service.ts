import { Option, Prisma, Product, Variant } from '@store-front-typescript-bootcamp/db'
import { prisma } from '../routes/lib/prismaClient'
import { CustomError } from '../common/errorHandler'
import { ErrorCodes, ErrorMessages, StatusCodes } from '../common/types'
import {OptionDTO, ProductDTO, VariantDTO } from '@store-front-typescript-bootcamp/schemas'

export class ProductServices {
  /**
   * Sorts the data content based on user selection
   * @param sortBy 
   * @returns 
   */
  private getOrderBy(sortBy?: string) {
    switch (sortBy) {
      case 'price-asc':
        return { price: 'asc' };
      case 'price-desc':
        return { price: 'desc' };
      case 'name-desc':
        return { name: 'desc' };
      default:
        return { name: 'asc' }; // Default sort by name ascending
    }
  }

  /**
   * Maps Prisma Product model to ProductDTO
   */
  private mapProductToDTO(product: any ): ProductDTO {
    return {
      id: product.id,
      name: product.name,
      description: product.description!,
      price: product.price,
      collectionName: product.collection.name, 
      collectionId: product.collection.id,
      variants: product.variants.map((variant: Variant) => this.mapVariantToDTO(variant)),
    }
  }

  /**
   * Maps Prisma Variant model to VariantDTO
   */
  private mapVariantToDTO(variant: any): VariantDTO {
    return {
      id: variant.id,
      imageUrls: variant.imageUrls,
      color: variant.color,
      colorCode: variant.colorCode,
      options: variant.options.map((option: Option) => this.mapOptionToDTO(option)),
    }
  }

  /**
   * Maps Prisma Option model to OptionDTO
   */
  private mapOptionToDTO(option: Option): OptionDTO {
    return {
      size: option.size,
      stock: option.stock,
    }
  }

  /**
   * Gets all Products with its variants and option values for those variants
   * @returns An array of ProductDTO
   */
  async getProducts(
    search: string,
    collectionId: string,
    sortBy: string
  ): Promise<ProductDTO[]> {
    const orderBy: Prisma.ProductCountOrderByAggregateInput = {
      name: sortBy.includes('name') ? (sortBy === 'name-asc' ? 'asc' : 'desc') : undefined,
      price: sortBy.includes('price') ? (sortBy === 'price-asc' ? 'asc' : 'desc') : undefined,
    };
  
    try {
      const products = await prisma.product.findMany({
        where: {
          AND: [
            search
              ? {
                  OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { collection: { name: { contains: search, mode: 'insensitive' } } },
                    { variants: { some: { color: { contains: search, mode: 'insensitive' } } } }
                  ]
                }
              : {},
            collectionId ? { collectionId } : {}
          ]
        },
        orderBy,
        include: {
          collection: { select: { name: true, id: true } },
          variants: {
            include: {
              options: { select: { size: true, stock: true } },
            },
          },
        },
      });

      return products.map((product) => this.mapProductToDTO(product));
    } catch (error) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ErrorCodes.INTERNAL_SERVER_ERROR,
        error as string
      );
    }
  }

  /**
   * Gets a single Product using its ID
   * @param id ID of the product
   * @returns The ProductDTO details
   */
  async getSingleProduct(id: string): Promise<ProductDTO> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        collection: { select: { name: true, id: true } }, 
        variants: {
          include: {
            options: { select: { size: true, stock: true } },
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

    return this.mapProductToDTO(product)
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
