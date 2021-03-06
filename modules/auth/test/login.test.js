const request = require('supertest');
const app = require('../../../app');
const {
  createUser,
} = require('../../../utils/test/testTools');
const { dbConnectForTest, dbClose } = require('../../../utils/dbConnect');

const path = '/auth/login';

describe(`POST ${path}`, () => {
  let user;
  beforeAll(async () => {
    await dbConnectForTest(true);
    user = await createUser({});
  });
  afterAll(async () => {
    await dbClose();
  });
  test('id 가 없을 시 400', async () => {
    await request(app)
      .post(path)
      .send({
        password: user.password,
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  test('password 가 없을 시 200', async () => {
    await request(app)
      .post(path)
      .send({
        id: user.id,
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
  test('password 가 틀린 경우 401', async () => {
    await request(app)
      .post(path)
      .send({
        id: user.id,
        password: 'incorrect_password',
      })
      .expect('Content-Type', /json/)
      .expect(401);
  });
  test('id, password 가 맞을 시 200', async () => {
    const res = await request(app)
      .post(path)
      .send({
        id: user.id,
        password: user.password,
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const resUser = res.body.user;
    const resToken = res.body.tokens;
    expect(resUser.id).toBe(user.id);
    expect(resUser.name).toBe(user.name);
    expect(resUser.password).toBeUndefined();
    expect(resToken).toBeDefined();
    expect(resToken.access).toBeDefined();
    expect(resToken.access.token).toBeDefined();
    expect(resToken.access.expires).toBeDefined();
    expect(resToken.refresh).toBeDefined();
    expect(resToken.refresh.token).toBeDefined();
    expect(resToken.refresh.expires).toBeDefined();
  });
});
