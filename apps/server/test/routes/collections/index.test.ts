import { describe, it, jest } from '@jest/globals';
import { collectionsRoute } from '../../../src/routes/collections';
import request from 'supertest';
import express from 'express'
import { baseApiUrl } from '../../../src/common/constants';

const app = express();

collectionsRoute(app)

jest.mock('../../../src/services/collection.service', () => ({
    CollectionServices:
    class MockCollectionServices {
        async getAllCollections(){
            return []
        }
    }
}));

describe('CollectionRoute', () => {
    describe('getAllCollections', () => {
      it('should return an array of collections', (done) => {
        request(app)
            .get(`${baseApiUrl}/collections`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
    });
  });

