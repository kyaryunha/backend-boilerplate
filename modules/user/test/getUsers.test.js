const request = require('supertest');
const app = require('../../../app');
const {
  createUser,
  getLoginTokens,
} = require('../../../utils/test/testTools');
const { dbConnectForTest, dbClose } = require('../../../utils/dbConnect');

const path = '/users';

describe(`GET ${path}`, () => {
  let users;
  let userToken;
  beforeAll(async () => {
    await dbConnectForTest(true);
    const promises = [];
    for (let _ = 0; _ < 100; _++) {
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
      .get(path)
      .expect('Content-Type', /json/)
      .expect(401);
  });
  test('[user] 아무런 쿼리가 없을 시, 100개 데이터 반환 200', async () => {
    const res = await request(app)
      .get(path)
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const resUsers = res.body.users;
    expect(resUsers.length).toBe(100);
    for (let i = 0; i < resUsers - 1; i++) {
      expect(resUsers[i].password).toBeUndefined();
    }
  });

  test('[user] limit = 3 일 때 3개 데이터 반환 200', async () => {
    const res = await request(app)
      .get(path)
      .query({
        limit: 3,
      })
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const resUsers = res.body.users;
    expect(resUsers.length).toBe(3);
  });

  test('[user] sortBy = name 일 때 name 순 ASC 정렬 200', async () => {
    const res = await request(app)
      .get(path)
      .query({
        sortBy: 'name',
      })
      .set('Authorization', `Bearer ${userToken.access.token}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const resUsers = res.body.users;
    for (let i = 0; i < resUsers - 1; i++) {
      expect(resUsers[i].name <= resUsers[i + 1].name).toBeTruthy();
    }
  });
});
