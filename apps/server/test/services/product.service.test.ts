import { describe, it, expect, jest } from '@jest/globals';
import { prisma } from '../../src/routes/lib/prismaClient';
import { ProductServices } from '../../src/services/product.service';
import { Product } from '@store-front-typescript-bootcamp/db';

const mockProduct: Product = {
  id: '1',
  name: 'Test Name',
  description: 'Description',
  price: 19.20,
  collectionId: 'testCollectionId',
  createdAt: new Date(),
  updatedAt: new Date()
};

jest.mock('../../src/routes/lib/prismaClient', () => {
  const mockMethods = {
    create: jest.fn(),
    delete: jest.fn()
  };

  return {
    prisma: {
      product: mockMethods,
    },
  };
});

const productService = new ProductServices();

describe('ProductServices', () => {
  describe('createSingleProduct', () => {
    it('should create a single product', async () => {

      (prisma.product.create as unknown as jest.MockedFunction<() => Promise<typeof mockProduct>>).mockResolvedValue(mockProduct);

      const product = await productService.createSingleProduct(mockProduct);

      expect(product).toEqual(mockProduct);
      expect(prisma.product.create).toHaveBeenCalledWith({data: mockProduct});
    });
  });

  describe('deleteSingleProduct', () => {
    it('should delete a single product', async () => {

      (prisma.product.delete as unknown as jest.MockedFunction<() => Promise<typeof mockProduct>>).mockResolvedValue(mockProduct);

      const deletedProduct = await productService.deleteSingleProduct(mockProduct.id);

      expect(deletedProduct).toEqual(mockProduct);
      expect(prisma.product.delete).toHaveBeenCalledWith({where: { id: mockProduct.id }});
    });
  });
});

