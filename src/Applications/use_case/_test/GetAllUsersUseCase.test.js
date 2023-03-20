const UserRepository = require('../../../Domains/users/UserRepository');
const GetAllUsersUseCase = require('../GetAllUsersUseCase');

describe('GetAllUsersUseCase', () => {
    it('should orchestrating the get all users action correctly', async () => {
        // Arrange
        const expectedListUsers = [
            {
                id: 'user-123',
                username: 'dicoding',
                fullname: 'Dicoding Indonesia',
            },
            {
                id: 'user-124',
                username: 'dicoding2',
                fullname: 'Dicoding Indonesia 2',
            },
        ];


        const mockUserRepository = new UserRepository();

        mockUserRepository.getAllUsers = jest.fn()
            .mockImplementation(() => Promise.resolve(expectedListUsers));

        const getAllUsersUseCase = new GetAllUsersUseCase({
            userRepository: mockUserRepository,
        });

        // Action
        const users = await getAllUsersUseCase.execute();

        // Assert
        expect(mockUserRepository.getAllUsers).toBeCalled();
        expect(users).toHaveLength(expectedListUsers.length);
        expect(users).toStrictEqual(expectedListUsers);
    });
});

