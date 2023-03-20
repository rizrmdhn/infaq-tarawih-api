const UserRepository = require('../../../Domains/users/UserRepository');
const GetOwnProfileUseCase = require('../GetOwnProfileUseCase');

describe('GetOwnProfileUseCase', () => {
    it('should orchestrating the get own profile action correctly', async () => {
        // Arrange
        const useCasePayload = {
            userId: 'user-123',
        };

        const mockUserRepository = new UserRepository();

        mockUserRepository.getOwnProfile = jest.fn()
            .mockImplementation(() => Promise.resolve());

        const getOwnProfileUseCase = new GetOwnProfileUseCase({
            userRepository: mockUserRepository,
        });

        // Action
        await getOwnProfileUseCase.execute(useCasePayload);

        // Assert
        expect(mockUserRepository.getOwnProfile).toBeCalledWith(useCasePayload.userId);
    });
});