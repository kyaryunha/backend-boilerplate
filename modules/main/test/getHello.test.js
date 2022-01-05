const request = require('supertest');
const app = require('../../../app');

describe('GET / getHello.test.js', () => {
  test('200을 리턴', async () => {
    await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
