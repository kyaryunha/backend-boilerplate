const request = require('supertest');
const app = require('../../../app');
const {
    createUser,
    getLoginTokens,
} = require('../../../utils/test/testTools');
const { dbConnect, dbClose } = require('../../../utils/dbConnect');

describe('GET /me main.test.js', () => {
    let user, userToken;
    beforeAll(async () => {
        await dbConnect(true);
        user = await createUser({});
        userToken = await getLoginTokens(user);
    });
    afterAll(async () => {
        await dbClose();
    })
    test('로그인 안한 유저 접근시 401', async function () {
        const res = await request(app)
            .get("/me")
            .expect("Content-Type", /json/)
            .expect(401);
    });
    test('로그인 한 유저 접근시 200', async function () {
        const res = await request(app)
            .get("/me")
            .set('Authorization', `Bearer ${userToken.access.token}`)
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
