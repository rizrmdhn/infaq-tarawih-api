const routes = (handler) => ([
    {
        method: 'POST',
        path: '/users',
        handler: handler.postUserHandler,
    },
    {
        method: 'GET',
        path: '/user/me',
        handler: handler.getOwnProfileHandler,
        options: {
            auth: 'infaqapi_jwt',
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: handler.getAllUsersHandler,
    },
]);

module.exports = routes;