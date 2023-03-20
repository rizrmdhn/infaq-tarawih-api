const InfaqRepositoryPostgres = require('../InfaqRepositoryPostgres');
const InfaqRepository = require('../../../Domains/infaq/InfaqRepository');
const InfaqTableTestHelper = require('../../../../tests/InfaqTableTestHelper');
const pool = require('../../database/postgres/pool');
const PostInfaq = require('../../../Domains/infaq/entities/PostInfaq');
const PostedInfaq = require('../../../Domains/infaq/entities/PostedInfaq');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('InfaqRepositoryPostgres', () => {
    it('should be instance of InfaqRepository domain', () => {
        const infaqRepositoryPostgres = new InfaqRepositoryPostgres({}, {});

        expect(infaqRepositoryPostgres).toBeInstanceOf(InfaqRepository);
    });

    describe('behavior test', () => {

        afterEach(async () => {
            await InfaqTableTestHelper.cleanTable();
            await UsersTableTestHelper.cleanTable();
        });

        afterAll(async () => {
            await pool.end();
        });

        describe('createInfaq function', () => {
            it('should persist create infaq and return posted infaq correctly', async () => {
                // Arrange
                await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });

                const newInfaq = new PostInfaq({
                    total: 10000,
                    ownerId: 'user-123',
                });

                const fakeIdGenerator = () => '123';
                const infaqRepositoryPostgres = new InfaqRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                const postedInfaq = await infaqRepositoryPostgres.createInfaq(newInfaq);

                // Assert
                const infaqs = await InfaqTableTestHelper.findInfaqById('infaq-123');

                expect(infaqs).toHaveLength(1);
                expect(postedInfaq).toBeInstanceOf(PostedInfaq);
                expect(postedInfaq.id).toEqual('infaq-123');
                expect(postedInfaq.total).toEqual(10000);
                expect(postedInfaq.ownerId).toEqual('user-123');
            });
        });

        describe('getInfaqs function', () => {
            it('should return infaqs correctly', async () => {
                // Arrange
                await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });

                const dates = new Date().toISOString();

                await InfaqTableTestHelper.addInfaq({ id: 'infaq-123', date: dates, total: 10000, ownerId: 'user-123' });
                await InfaqTableTestHelper.addInfaq({ id: 'infaq-124', date: dates, total: 20000, ownerId: 'user-123' });

                const infaqRepositoryPostgres = new InfaqRepositoryPostgres(pool, {});

                // Action 
                const infaqs = await infaqRepositoryPostgres.getInfaqs();

                // Assert
                expect(infaqs).toEqual([
                    {
                        id: 'infaq-123',
                        total: 10000,
                        date: dates,
                        ownerId: 'user-123',
                    },
                    {
                        id: 'infaq-124',
                        total: 20000,
                        date: dates,
                        ownerId: 'user-123',
                    },
                ]);
            });
        });

        describe('getInfaqById function', () => {
            it('should throw NotFoundError when infaq not found', async () => {
                // Arrange
                const infaqRepositoryPostgres = new InfaqRepositoryPostgres(pool, {});

                // Action & Assert
                await expect(infaqRepositoryPostgres.getInfaqById('infaq-123')).rejects.toThrowError(NotFoundError);
            });

            it('should return infaq correctly', async () => {
                // Arrange
                await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });

                await InfaqTableTestHelper.addInfaq({ id: 'infaq-123', date: new Date().toISOString(), total: 10000, ownerId: 'user-123' });

                const infaqRepositoryPostgres = new InfaqRepositoryPostgres(pool, {});

                // Action
                const infaq = await infaqRepositoryPostgres.getInfaqById('infaq-123');

                // Assert
                expect(infaq).toEqual({
                    id: 'infaq-123',
                    total: 10000,
                    ownerId: 'user-123',
                });
            });
        });

        describe('deleteInfaqById function', () => {
            it('should throw NotFoundError when infaq not found', async () => {
                // Arrange
                await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });

                await InfaqTableTestHelper.addInfaq({ id: 'infaq-123', date: new Date().toISOString(), total: 10000, ownerId: 'user-123' });

                const infaqRepositoryPostgres = new InfaqRepositoryPostgres(pool, {});

                // Action & Assert
                await expect(infaqRepositoryPostgres.deleteInfaqById('infaq-124')).rejects.toThrowError(NotFoundError);
            });

            it('should delete infaq correctly', async () => {
                // Arrange
                await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret', fullname: 'Dicoding Indonesia' });

                await InfaqTableTestHelper.addInfaq({ id: 'infaq-123', date: new Date().toISOString(), total: 10000, ownerId: 'user-123' });

                const infaqRepositoryPostgres = new InfaqRepositoryPostgres(pool, {});

                // Action
                await infaqRepositoryPostgres.deleteInfaqById('infaq-123');

                // Assert
                const infaqs = await InfaqTableTestHelper.findInfaqById('infaq-123');

                expect(infaqs).toHaveLength(0);
            });
        });
    });
});