const createServer = require('../createServer');

describe('HTTP Server Test', () => {
    it('should response 404 when request unregistered route', async () => {
        // Arrange
        const server = await createServer({});

        // Action
        const response = await server.inject({
            method: 'GET',
            url: '/unregisteredRoute',
        });

        // Assert
        expect(response.statusCode).toEqual(404);
    });

    describe('when GET /', () => {
        it('should return 200 and hello world', async () => {
            // Arrange
            const server = await createServer({});
            // Action
            const response = await server.inject({
                method: 'GET',
                url: '/',
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.value).toEqual('Hello world!');
        });
    });
});