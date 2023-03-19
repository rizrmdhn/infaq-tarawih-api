const pool = require('../src/Infrastructures/database/postgres/pool');

const InfaqTableTestHelper = {
    async addInfaq({
        id = 'infaq-123', total = 1000, ownerId = 'user-123',
    }) {
        const query = {
            text: 'INSERT INTO infaq VALUES($1, $2, $3)',
            values: [id, total, ownerId],
        };

        await pool.query(query);

    },

    async findInfaqById(id) {
        const query = {
            text: 'SELECT * FROM infaq WHERE id = $1',
            values: [id],
        }

        const result = await pool.query(query);

        return result.rows;
    },

    async cleanTable() {
        await pool.query('DELETE FROM thread WHERE 1=1');
    },

};

module.exports = InfaqTableTestHelper;