const request = require('supertest');
const app = require('../../../app');
const {
  createUser,
  getLoginTokens,
} = require('../../../utils/test/testTools');
const { dbConnectForTest, dbClose } = require('../../../utils/dbConnect');

const path = '/me';

describe(`GET ${path}`, () => {
  let user;
  let userToken;
  beforeAll(async () => {
    await dbConnectForTest(true);
    user = await createUser({});
    userToken = await getLoginTokens(user);
  });
  afterAll(async () => {
    await dbClose();
  });
  test('로그인 안한 유저 접근시 401', async () => {
    await request(app)
      .get(path)
      .expect('Content-Type', /json/)
      .expect(401);
  });
  test('로그인 한 유저 접근시 200', async () => {
    await request(app)
      .get(path)
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
