const request = require('supertest');
const app = require('../../../app');

const path = '/';

describe(`GET ${path}`, () => {
  test('접속 시, 200', async () => {
    const res = await request(app)
      .get(path)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.description).toBe('Backend Boilerplate');
  });
});
