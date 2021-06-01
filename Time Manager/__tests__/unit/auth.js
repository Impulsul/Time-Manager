const request = require('supertest');

const authController = require('../../controller/auth');
const registerController = require('../../controller/users')
const appConfig = require('../../config');
const testSetup = require('../helpers/setup');
const authService = require("../../services/auth");
const basicAuth = require("express-basic-auth");
let app;

const initApp = async () => {
    app = testSetup.getExpressApp();
    app.use('/users', registerController);

    app.use(
        basicAuth({
          authorizer: authService.asyncAuthorizer,
          authorizeAsync: true,
          unauthorizedResponse: authService.getUnauthorizedResponse,
        })
      );
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
    test(`Test if register works, and test the auth `, async () => {
        await request(app)
            .post("/users")
            .send({
                username: appConfig.USERNAME,
                password: appConfig.PASSWORD
            })
            .expect(200)
            .then((response) => {
                expect(response.body._index).toBe("users")
            })
    });
    test(`Check for an  user, it should return 200 and the auth token`, async () => {
        await request(app)
            .get('/auth')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .expect(200)
            .then(response => {
                expect(response.body.user.username).toBe(appConfig.USERNAME);
                expect(response.body.message).toBe('User auth');
                expect(response.body).toHaveProperty('token')
            });
    });

})
