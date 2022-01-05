const request = require('supertest');
const app = require('../../../app');
const { dbConnect, dbClose } = require('../../../utils/dbConnect');

describe('GET / getHello.test.js', () => {
    test('200을 리턴', async function () {
        const res = await request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
