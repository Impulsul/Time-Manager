const ApiError = require('../../error/error');


describe("Test api", () => {
    test('Should be able to store message and status code as given in constructor', () => {
        const err = new ApiError('err', 400);
        expect(err.message).toBe('err');
        expect(err.statusCode).toBe(400);
    })
})