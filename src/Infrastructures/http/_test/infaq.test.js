const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InfaqTableTestHelper = require('../../../../tests/InfaqTableTestHelper');
const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');

describe('/infaq endpoint', () => {
    let server;
    let authResponse;
    let accessToken;

    beforeAll(async () => {
        const loginPayload = {
            username: 'dicoding',
            password: 'secret',
        };

        server = await createServer(container);

        await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: loginPayload.username,
                password: loginPayload.password,
                fullname: 'Dicoding Indonesia',
            },
        });

        authResponse = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: loginPayload,
        });

        const { data } = JSON.parse(authResponse.payload);

        accessToken = data.accessToken;
    });

    afterAll(async () => {
        await UsersTableTestHelper.cleanTable();
        await InfaqTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('when POST /infaq', () => {
        it('should response 401 if payload not access token', async () => {
            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/infaq',
                payload: {},
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.error).toEqual('Unauthorized');
            expect(responseJson.message).toEqual('Missing authentication');
        });

        it('should response 400 if payload not contain needed property', async () => {
            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/infaq',
                payload: {},
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Tidak dapat membuat infaq baru karena properti yang dibutuhkan tidak ada');
        });

        it('should response 400 if payload not meet data type specification', async () => {
            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/infaq',
                payload: {
                    total: '10000',
                },
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Tidak dapat membuat infaq baru karena tipe data tidak sesuai');
        });

        it('should response 201 if payload is valid', async () => {
            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/infaq',
                payload: {
                    total: 10000,
                },
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });
    });

    describe('when GET /infaq', () => {
        it('should response 201 if payload is valid', async () => {
            // Action
            const response = await server.inject({
                method: 'GET',
                url: '/infaq',
                payload: {},
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });
    });

    describe('when GET /infaq/{infaqId}', () => {
        it('should response 404 if data not found', async () => {
            // Action
            const response = await server.inject({
                method: 'GET',
                url: '/infaq/123',
                payload: {},
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Data tidak ditemukan');
        });

        it('should response 200 if data found', async () => {
            // Arrange
            const response = await server.inject({
                method: 'POST',
                url: '/infaq',
                payload: {
                    total: 10000,
                },
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const { data: { infaqId } } = JSON.parse(response.payload);

            // Action
            const getResponse = await server.inject({
                method: 'GET',
                url: `/infaq/${infaqId}`,
                payload: {},
            });

            // Assert
            const getResponseJson = JSON.parse(getResponse.payload);
            expect(getResponse.statusCode).toEqual(200);
            expect(getResponseJson.status).toEqual('success');
            expect(getResponseJson.data).toBeDefined();
        });
    });

    describe('when DELETE /infaq/{infaqId}', () => {
        it('should response 404 if data not found', async () => {
            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: '/infaq/123',
                payload: {},
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Data tidak ditemukan');
        });

        it('should response 200 if data found', async () => {
            // Arrange
            const response = await server.inject({
                method: 'POST',
                url: '/infaq',
                payload: {
                    total: 10000,
                },
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const { data: { infaqId } } = JSON.parse(response.payload);

            // Action
            const deleteResponse = await server.inject({
                method: 'DELETE',
                url: `/infaq/${infaqId}`,
                payload: {},
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            // Assert
            const deleteResponseJson = JSON.parse(deleteResponse.payload);
            expect(deleteResponse.statusCode).toEqual(200);
            expect(deleteResponseJson.status).toEqual('success');
            expect(deleteResponseJson.message).toEqual('Data berhasil dihapus');
        });
    });
});