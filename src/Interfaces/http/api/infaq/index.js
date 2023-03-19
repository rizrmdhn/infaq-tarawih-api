const InfaqHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'infaq',
    register: async (server, { container }) => {
        const infaqHandler = new InfaqHandler(container);
        server.route(routes(infaqHandler));
    },
};