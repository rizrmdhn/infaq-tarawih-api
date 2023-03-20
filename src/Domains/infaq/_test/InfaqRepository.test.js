const InfaqRepository = require('../InfaqRepository');

describe('InfaqRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const infaqRepository = new InfaqRepository();

        // Action and Assert
        await expect(infaqRepository.createInfaq()).rejects.toThrowError('INFAQ_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(infaqRepository.getInfaqs()).rejects.toThrowError('INFAQ_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(infaqRepository.getInfaqById()).rejects.toThrowError('INFAQ_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(infaqRepository.deleteInfaqById()).rejects.toThrowError('INFAQ_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});