const PostInfaq = require('../../../Domains/infaq/entities/PostInfaq');
const PostedInfaq = require('../../../Domains/infaq/entities/PostedInfaq');
const InfaqRepository = require('../../../Domains/infaq/InfaqRepository');
const GetInfaqUseCase = require('../GetInfaqUseCase');


describe('GetInfaqUseCase', () => {
    it('should orchestrating the get infaq action correctly', async () => {
        // Arrange
        const expectedListInfaq = [
            new PostedInfaq({
                id: 'infaq-123',
                date: '2021-01-01',
                total: 100000,
                ownerId: 'user-123',
            }),
            new PostedInfaq({
                id: 'infaq-124',
                date: '2021-01-01',
                total: 200000,
                ownerId: 'user-123',
            }),
        ];

        // creating dependency of use case
        const mockInfaqRepository = new InfaqRepository();

        // mocking needed function
        mockInfaqRepository.getInfaqs = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedListInfaq));

        // creating use case instance
        const getInfaqUseCase = new GetInfaqUseCase({
            infaqRepository: mockInfaqRepository,
        });

        // Action
        const postedInfaq = await getInfaqUseCase.execute();

        // Assert
        expect(mockInfaqRepository.getInfaqs).toBeCalled();
        expect(postedInfaq).toHaveLength(expectedListInfaq.length);
        expect(postedInfaq).toStrictEqual(expectedListInfaq);
    });
});