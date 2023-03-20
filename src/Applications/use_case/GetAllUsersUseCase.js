class GetAllUsersUseCase {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async execute() {
        const users = await this._userRepository.getAllUsers();
        return users;
    }
}

module.exports = GetAllUsersUseCase;