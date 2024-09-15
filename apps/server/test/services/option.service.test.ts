import { describe, it, expect, jest } from '@jest/globals';
import { prisma } from '../../src/routes/lib/prismaClient';
import { OptionServices } from '../../src/services/option.service';
import { Option } from '@store-front-typescript-bootcamp/db';

const mockOption: Option = {
  id: '1',
  size: 'Test Size',
  variantId: 'A test collection',
  stock: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('../../src/routes/lib/prismaClient', () => {
  const mockMethods = {
    findMany: jest.fn(),
    findUnique: jest.fn()
  };

  return {
    prisma: {
      option: mockMethods,
    },
  };
});

const optionService = new OptionServices();

describe('OptionServices', () => {
  describe('getAllOptions', () => {
    it('should return an array of options', async () => {

      (prisma.option.findMany as jest.MockedFunction<() => Promise<typeof mockOption[]>>).mockResolvedValue([mockOption]);

      const options = await optionService.getAllOptions();

      expect(options).toEqual([mockOption]);
      expect(prisma.option.findMany).toHaveBeenCalledWith({
        include: { variant: { include: { options: true } } },
      });
    });
  });

  describe('getSingleOption', () => {
    it('should return a single option', async () => {

      (prisma.option.findUnique as unknown as jest.MockedFunction<() => Promise<typeof mockOption>>).mockResolvedValue(mockOption);

      const singleOption = await optionService.getSingleOption(mockOption.id);

      expect(singleOption).toEqual(mockOption);
      expect(prisma.option.findUnique).toHaveBeenCalledWith({
        where: { id: mockOption.id },
        include: {
          variant: {
            include: { options: true },
          },
        },
      });
    });
  });
});

