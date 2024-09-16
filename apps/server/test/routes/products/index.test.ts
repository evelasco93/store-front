import { describe, it, jest } from '@jest/globals';
import { productsRoute } from '../../../src/routes/products';
import request from 'supertest';
import express from 'express'
import { baseApiUrl } from '../../../src/common/constants';

const app = express();

productsRoute(app)

jest.mock('../../../src/services/product.service', () => ({
    ProductServices:
    class MockProductServices {
        async getProducts(){
            return []
        }
    }
}));

describe('ProductsRoute', () => {
    describe('getAllProducts', () => {
      it('should return an array of products', (done) => {
        request(app)
            .get(`${baseApiUrl}/products`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
    });
  });

