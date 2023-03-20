class GetOwnProfileUseCase {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async execute({ userId }) {
        const user = await this._userRepository.getOwnProfile(userId);
        return user;
    }
}

module.exports = GetOwnProfileUseCase;