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
      .patch(getPath(path, {
        userId: users[0].id,
      }))
      .expect('Content-Type', /json/)
      .expect(401);
  });
  test('[user] 타인의 이름 수정 시 403', async () => {
    const newName = 'change name';
    await request(app)
      .patch(getPath(path, {
        userId: users[1].id,
      }))
      .send({
        name: newName,
      })
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(403);
  });
  test('[user] 자신의 이름 수정 시 200', async () => {
    const newName = 'change name';
    const res = await request(app)
      .patch(getPath(path, {
        userId: users[0].id,
      }))
      .send({
        name: newName,
      })
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const resUser = res.body.user;
    expect(resUser.name).toBe(newName);
  });
});
