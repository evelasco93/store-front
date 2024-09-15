import { describe, it, jest } from '@jest/globals';
import { optionsRoute } from '../../../src/routes/options';
import request from 'supertest';
import express from 'express'
import { baseApiUrl } from '../../../src/common/constants';

const app = express();

optionsRoute(app)

jest.mock('../../../src/services/option.service', () => ({
    OptionServices:
    class MockOptionServices {
        async getAllOptions(){
            return []
        }
    }
}));

describe('OptionsRoute', () => {
    describe('getAlloptions', () => {
      it('should return an array of options', (done) => {
        request(app)
            .get(`${baseApiUrl}/options`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
    });
  });

