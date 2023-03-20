const infaqRepository = require('../../Domains/infaq/InfaqRepository');
const PostedInfaq = require('../../Domains/infaq/entities/PostedInfaq');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');

class InfaqRepositoryPostgres extends infaqRepository {
    constructor(pool, idGenerator) {
        super();

        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async createInfaq(postInfaq) {
        const id = `infaq-${this._idGenerator()}`;
        const { total, ownerId } = postInfaq;
        const date = new Date().toISOString();

        const query = {
            text: 'INSERT INTO infaq VALUES($1, $2, $3, $4) RETURNING id, date, total, "ownerId"',
            values: [id, date, total, ownerId],
        };

        const result = await this._pool.query(query);

        return new PostedInfaq({ ...result.rows[0] });
    }

    async getInfaqs() {
        const result = await this._pool.query('SELECT id, date, total, "ownerId" FROM infaq');

        return result.rows;
    }

    async getInfaqById(infaqId) {
        const query = {
            text: 'SELECT id, total, "ownerId" FROM infaq WHERE id = $1',
            values: [infaqId],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Data tidak ditemukan');
        }

        return result.rows[0];
    }

    async deleteInfaqById(infaqId) {

        const query = {
            text: 'DELETE FROM infaq WHERE id = $1 RETURNING id',
            values: [infaqId],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Data tidak ditemukan');
        }

    }
}

module.exports = InfaqRepositoryPostgres;