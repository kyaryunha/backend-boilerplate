const request = require('supertest');
const app = require('../../app');
const { dbConnect, dbClose } = require('../../utils/test/dbConnect');
describe('GET / main.test.js', () => {
    beforeAll(async () => {
        await dbConnect(true);
    });
    afterAll(async () => {
        await dbClose();
    })
    test('200을 리턴', async function () {
        const res = await request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
