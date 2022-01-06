const request = require('supertest');
const app = require('../../../app');
const {
  getPath,
  createUser,
  getLoginTokens,
} = require('../../../utils/test/testTools');
const { dbConnectForTest, dbClose } = require('../../../utils/dbConnect');

const path = '/users/:userId';

describe(`GET ${path}`, () => {
  let users;
  let userToken;
  beforeAll(async () => {
    await dbConnectForTest(true);
    const promises = [];
    for (let _ = 0; _ < 5; _++) {
      promises.push(createUser({}));
    }
    users = await Promise.all(promises);
    userToken = await getLoginTokens(users[0]);
  });
  afterAll(async () => {
    await dbClose();
  });
  test('로그인 안한 유저 접근시 401', async () => {
    await request(app)
      .get(getPath(path, {
        userId: users[0].id,
      }))
      .expect('Content-Type', /json/)
      .expect(401);
  });
  test('[user] 타인의 정보 요청 시 200', async () => {
    await request(app)
      .get(getPath(path, {
        userId: users[1].id,
      }))
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });
  test('[user] 자신의 정보 요청 시 200', async () => {
    await request(app)
      .get(getPath(path, {
        userId: users[0].id,
      }))
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
