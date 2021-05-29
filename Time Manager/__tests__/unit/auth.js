const request = require('supertest');

const authController = require('../../controller/auth');
const appConfig = require('../../config');
const testSetup = require('../helpers/setup');

let app;

const initApp = async () => {
    app = testSetup.getExpressApp();
    app.use('/auth', authController);

    return app;
}

beforeAll(async (done) => {
    done();
})

beforeEach(async (done) => {
    await initApp();
    done();
});

afterEach(async (done) => {
    jest.restoreAllMocks();
    done();
});

afterAll(async (done) => {
    done();
});


describe(`Test auth controller`, () => {
    test(`Check for an unauthorised user, it should throw 401`, async () => {
        await request(app)
            .get('/auth')
            .expect(401)
            .then(response => {
                expect(response.body.message).toBe('No credentials provided');
            });
    });
    test(`Check for an unauthorised user, it should throw 401`, async () => {
        await request(app)
            .get('/auth')
            .auth('asdf@asdf.com', 'password13542')
            .expect(200)
            .then(response => {
                console.log(response.body)
                expect(response.body.user.username).toBe("asdf@asdf.com");
                expect(response.body.message).toBe('User auth');
                expect(response.body).toHaveProperty('token')
            });
    })
})
