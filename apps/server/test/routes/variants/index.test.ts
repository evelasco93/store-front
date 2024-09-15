import { describe, it, jest } from '@jest/globals';
import { variantsRoute } from '../../../src/routes/variants';
import request from 'supertest';
import express from 'express'
import { baseApiUrl } from '../../../src/common/constants';

const app = express();

variantsRoute(app)

jest.mock('../../../src/services/variant.service', () => ({
    VariantServices:
    class MockVariantServices {
        async getAllVariants(){
            return []
        }
    }
}));

describe('VariantsRoute', () => {
    describe('getAllVariants', () => {
      it('should return an array of variants', (done) => {
        request(app)
            .get(`${baseApiUrl}/variants`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
    });
  });

