import { describe, it, expect, jest } from '@jest/globals';
import { prisma } from '../../src/routes/lib/prismaClient';
import { CollectionServices } from '../../src/services/collection.service';
import { Collection } from '@store-front-typescript-bootcamp/db';

const mockCollection: Collection = {
  id: '1',
  name: 'Test Collection',
  description: 'A test collection',
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
      collection: mockMethods,
    },
  };
});

const collectionService = new CollectionServices();

describe('CollectionServices', () => {
  describe('getAllCollections', () => {
    it('should return an array of collections', async () => {

      (prisma.collection.findMany as jest.MockedFunction<() => Promise<typeof mockCollection[]>>).mockResolvedValue([mockCollection]);

      const collections = await collectionService.getAllCollections();

      expect(collections).toEqual([mockCollection]);
      expect(prisma.collection.findMany).toHaveBeenCalledWith({
        include: {
          products: { include: { variants: { include: { options: true } } } },
        },
      });
    });
  });
  describe('getSingleCollection', () => {
    it('should return a single collection', async () => {

      (prisma.collection.findUnique as unknown as jest.MockedFunction<() => Promise<typeof mockCollection>>).mockResolvedValue(mockCollection);

      const singleCollection = await collectionService.getSingleCollection(mockCollection.id);

      expect(singleCollection).toEqual(mockCollection);
      expect(prisma.collection.findUnique).toHaveBeenCalledWith({
        where: { id: mockCollection.id },
        include: { products: true },
      });
    });
  });
});

