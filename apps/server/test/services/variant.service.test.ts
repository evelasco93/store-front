import { describe, it, expect, jest } from '@jest/globals';
import { prisma } from '../../src/routes/lib/prismaClient';
import { VariantServices } from '../../src/services/variant.service';
import { Variant } from '@store-front-typescript-bootcamp/db';

const mockVariant: Variant = {
  id: '1',
  color: 'Test color',
  colorCode: 'testColorCode',
  createdAt: new Date(),
  imageUrls: ['testurl1', 'testurl2'],
  productId: "testProductId",
  updatedAt: new Date()
};

jest.mock('../../src/routes/lib/prismaClient', () => {
  const mockMethods = {
    findMany: jest.fn(),
    findUnique: jest.fn()
  };

  return {
    prisma: {
      variant: mockMethods,
    },
  };
});

const variantService = new VariantServices();

describe('VariantServices', () => {
  describe('getAllVariants', () => {
    it('should return an array of variants', async () => {

      (prisma.variant.findMany as jest.MockedFunction<() => Promise<typeof mockVariant[]>>).mockResolvedValue([mockVariant]);

      const variants = await variantService.getAllVariants();

      expect(variants).toEqual([mockVariant]);
      expect(prisma.variant.findMany).toHaveBeenCalledWith();
    });
  });

  describe('getSingleVariant', () => {
    it('should return a single variant', async () => {

      (prisma.variant.findUnique as unknown as jest.MockedFunction<() => Promise<typeof mockVariant>>).mockResolvedValue(mockVariant);

      const singleVariant = await variantService.getSingleVariant(mockVariant.id);

      expect(singleVariant).toEqual(mockVariant);
      expect(prisma.variant.findUnique).toHaveBeenCalledWith(
        { where: { id: singleVariant.id } }
      );
    });
  });
});

