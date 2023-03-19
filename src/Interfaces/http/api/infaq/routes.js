const routes = (handler) => ([
    {
        method: 'POST',
        path: '/infaq',
        handler: handler.postInfaqHandler,
        options: {
            auth: 'infaqapi_jwt',
        }
    },
    {
        method: 'GET',
        path: '/infaq',
        handler: handler.getInfaqHandler,
    },
    {
        method: 'GET',
        path: '/infaq/{infaqId}',
        handler: handler.getInfaqByIdHandler,
    },
]);

module.exports = routes;