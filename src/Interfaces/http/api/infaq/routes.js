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
    {
        method: 'DELETE',
        path: '/infaq/{infaqId}',
        handler: handler.deleteInfaqByIdHandler,
        options: {
            auth: 'infaqapi_jwt',
        }
    },
]);

module.exports = routes;