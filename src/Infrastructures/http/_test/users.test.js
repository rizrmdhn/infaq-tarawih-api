const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/users endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
    });

    describe('when POST /users', () => {

        it('should response 400 when request payload not contain needed property', async () => {
            // Arrange
            const requestPayload = {
                fullname: 'Dicoding Indonesia',
                password: 'secret',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
        });

        it('should response 400 when request payload not meet data type specification', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicoding',
                password: 'secret',
                fullname: ['Dicoding Indonesia'],
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai');
        });

        it('should response 400 when username more than 50 character', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat user baru karena karakter username melebihi batas limit');
        });

        it('should response 400 when username contain restricted character', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicoding indonesia',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat user baru karena username mengandung karakter terlarang');
        });

        it('should response 400 when username unavailable', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ username: 'dicoding' });
            const requestPayload = {
                username: 'dicoding',
                fullname: 'Dicoding Indonesia',
                password: 'super_secret',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('username tidak tersedia');
        });

        it('should response 201 and persisted user', async () => {
            // Arrange
            const requestPayload = {
                username: 'dicoding',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
            };
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedUser).toBeDefined();
        });
    });

    describe('when Get /user/me', () => {
        it('should response 200 and user profile', async () => {
            // Arrange
            const loginPayload = {
                username: 'dicoding',
                password: 'secret',
            }

            const server = await createServer(container);

            await server.inject({
                method: 'POST',
                url: '/users',
                payload: {
                    username: loginPayload.username,
                    password: loginPayload.password,
                    fullname: 'Dicoding Indonesia',
                }
            });

            const responseAuth = await server.inject({
                method: 'POST',
                url: '/authentications',
                payload: loginPayload,
            });

            const { data } = JSON.parse(responseAuth.payload);

            const { accessToken } = data;


            // Action
            const response = await server.inject({
                method: 'GET',
                url: '/user/me',
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.user).toBeDefined();
        });
    });

    describe('when GET /users', () => {
        it('should response 200 and list of users', async () => {
            // Arrange
            await UsersTableTestHelper.addUser({ username: 'dicoding' });
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'GET',
                url: '/users',
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.users).toHaveLength(1);
        });
    });
});
