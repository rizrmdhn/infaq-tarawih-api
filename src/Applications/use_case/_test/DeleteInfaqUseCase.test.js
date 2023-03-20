const InfaqRepository = require('../../../Domains/infaq/InfaqRepository');
const DeleteInfaqUseCase = require('../DeleteInfaqUseCase');

describe('DeleteInfaqUseCase', () => {
    it('should throw error if use case payload not contain needed property', async () => {
        const useCasePayload = {};

        const deleteInfaqUseCase = new DeleteInfaqUseCase({});

        await expect(deleteInfaqUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_INFAQ_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error if use case payload not meet data type specification', async () => {
        const useCasePayload = {
            infaqId: 123,
        };

        const deleteInfaqUseCase = new DeleteInfaqUseCase({});

        await expect(deleteInfaqUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_INFAQ_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should orchestrating the delete infaq action correctly', async () => {
        // Arrange
        const useCasePayload = {
            infaqId: 'infaq-123',
        };

        const mockInfaqRepository = new InfaqRepository();

        mockInfaqRepository.getInfaqById = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockInfaqRepository.deleteInfaqById = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const deleteInfaqUseCase = new DeleteInfaqUseCase({
            infaqRepository: mockInfaqRepository,
        });

        // Action
        await deleteInfaqUseCase.execute(useCasePayload);

        // Assert
        expect(mockInfaqRepository.getInfaqById).toBeCalledWith(useCasePayload.infaqId);
        expect(mockInfaqRepository.deleteInfaqById).toBeCalledWith(useCasePayload.infaqId);

    });
});