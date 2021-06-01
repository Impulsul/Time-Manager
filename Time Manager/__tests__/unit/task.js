const request = require('supertest');

const tasksController = require('../../controller/tasks')
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
    app.use('/tasks', tasksController);

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


describe(`Test task controller`, () => {
    test(`Create a task`, async () => {
        await request(app)
            .post('/tasks')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .send({
                name: 'test task',
                description: 'asdf',
                startDate: new Date().toJSON(),
                endDate: new Date().toJSON()
            })
            .expect(200)
            .then(response => {
                expect(response.body._index).toBe("tasks");
                expect(response.body).toHaveProperty("_id");
            });
    });

    test(`Create a task and then delete it`, async () => {
        await request(app)
            .post('/tasks')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .send({
                name: 'test task',
                description: 'asdf',
                startDate: new Date().toJSON(),
                endDate: new Date().toJSON()
            })
            .expect(200)
            .then(async(response) => {
                const id = response.body._id
                await request(app)
                .delete(`/tasks/${id}`)
                .auth(appConfig.USERNAME, appConfig.PASSWORD)
                .expect(202)
            });
    });
    test(`Update a task with a wrong state`, async () => {
        await request(app)
            .post('/tasks')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .send({
                name: 'test task',
                description: 'asdf',
                startDate: new Date().toJSON(),
                endDate: new Date().toJSON()
            })
            .expect(200)
            .then(async(response) => {
                const id = response.body._id
                await request(app)
                .put(`/tasks/${id}/state/random`)
                .auth(appConfig.USERNAME, appConfig.PASSWORD)
                .expect(400)
                .then(response => {
                    expect(response.body).toHaveProperty('errors')
                    expect(response.body.errors.state.value).toBe('random')
                    expect(response.body.errors.state.msg).toBe('state must be in created,inProgress,done')
                })
            });
    });

    test(`Update a task with a good state`, async () => {
        await request(app)
            .post('/tasks')
            .auth(appConfig.USERNAME, appConfig.PASSWORD)
            .send({
                name: 'test task',
                description: 'asdf',
                startDate: new Date().toJSON(),
                endDate: new Date().toJSON()
            })
            .expect(200)
            .then(async(response) => {
                const id = response.body._id
                await request(app)
                .put(`/tasks/${id}/state/inProgress`)
                .auth(appConfig.USERNAME, appConfig.PASSWORD)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty('_index')
                    expect(response.body._index).toBe('tasks')
                    expect(response.body._id).toBe(id)
                })
            });
    });

})
