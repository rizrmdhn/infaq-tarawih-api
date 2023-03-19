const PostInfaq = require('../../../Domains/infaq/entities/PostInfaq');
const PostedInfaq = require('../../../Domains/infaq/entities/PostedInfaq');
const InfaqRepository = require('../../../Domains/infaq/InfaqRepository');
const AddInfaqUseCase = require('../AddInfaqUseCase');

describe('AddInfaqUseCase', () => {
    it('should orchestrating the add infaq action correctly', async () => {
        // Arrange
        const useCasePayload = {
            total: 10000,
            ownerId: 'user-123',
        };

        const expectedPostedInfaq = new PostedInfaq({
            id: 'infaq-123',
            date: new Date().toISOString(),
            total: useCasePayload.total,
            ownerId: useCasePayload.ownerId,
        });


        /** creating dependency of use case */
        const mockInfaqRepository = new InfaqRepository();

        /** mocking needed function */
        mockInfaqRepository.createInfaq = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedPostedInfaq));

        // creating use case instance
        const addInfaqUseCase = new AddInfaqUseCase({
            infaqRepository: mockInfaqRepository,
        });

        // Action
        const postedInfaq = await addInfaqUseCase.execute(useCasePayload);

        // Assert
        expect(postedInfaq).toStrictEqual(expectedPostedInfaq);
        expect(mockInfaqRepository.createInfaq).toBeCalledWith(new PostInfaq(useCasePayload));
    });
});