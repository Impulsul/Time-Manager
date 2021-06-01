const request = require('supertest');

const meetingsController = require('../../controller/meetings')
const appConfig = require('../../config');
const testSetup = require('../helpers/setup');
const authService = require("../../services/auth");
const basicAuth = require("express-basic-auth");
let app;

const initApp = async () => {
    app = testSetup.getExpressApp();

    app.use(
        basicAuth({
          authorizer: authService.asyncAuthorizer,
          authorizeAsync: true,
          unauthorizedResponse: authService.getUnauthorizedResponse,
        })
      );
    app.use('/meetings', meetingsController);

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


describe(`Test meetings controller`, () => {
    test(`Create a meeting with incompleat fields`, async () => {
        await request(app)
            .post('/meetings')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .send({
                name: 'test meetings',
                description: 'asdf',
                startDate: new Date().toJSON(),
            })
            .expect(400)
            .then(response => {
                expect(response.body).toHaveProperty("errors");
                expect(response.body.errors).toHaveProperty("duration");
                expect(response.body.errors).toHaveProperty("participants");
                expect(response.body.errors.participants.msg).toBe('Meeting should have at least one participant');
                expect(response.body.errors.duration.msg).toBe("Meeting must have a duration");
            });
    });

    test(`Create a meeting`, async () => {
        await request(app)
            .post('/meetings')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .send({
                name: 'test meetings',
                description: 'asdf',
                startDate: new Date().toJSON(),
                duration: 25,
                participants: ['leo']
            })
            .expect(200)
            .then(response => {
                expect(response.body._index).toBe("meetings");
                expect(response.body).toHaveProperty("_id");
            });
    });


})
