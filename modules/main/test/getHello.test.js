const request = require('supertest');
const app = require('../../../app');

const path = '/';

describe(`GET ${path}`, () => {
  test('200을 리턴', async () => {
    await request(app)
      .get(path)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
