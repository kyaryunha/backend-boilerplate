const request = require('supertest');
const app = require('../../../app');
const { dbConnectForTest, dbClose } = require('../../../utils/dbConnect');

const path = '/auth/register';

describe(`POST ${path}`, () => {
  beforeAll(async () => {
    await dbConnectForTest(true);
  });
  afterAll(async () => {
    await dbClose();
  });
  test('id 가 없을 시 400', async () => {
    await request(app)
      .post(path)
      .send({
        name: 'hello',
        password: 'hello_world',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  test('name 가 없을 시 400', async () => {
    await request(app)
      .post(path)
      .send({
        id: 'hello',
        password: 'hello_world',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  test('password 가 없을 시 400', async () => {
    await request(app)
      .post(path)
      .send({
        id: 'hello',
        name: 'hello',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  test('password 가 8글자 미만일 시 400', async () => {
    await request(app)
      .post(path)
      .send({
        id: 'hello',
        name: 'hello',
        password: '1234567',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  test('id, name, password 가 있을 시 201', async () => {
    const res = await request(app)
      .post(path)
      .send({
        id: 'hello',
        name: 'hello',
        password: 'hello_world',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    const resUser = res.body.user;
    expect(resUser.id).toBe('hello');
    expect(resUser.name).toBe('hello');
    expect(resUser.password).toBeUndefined();
  });
});
