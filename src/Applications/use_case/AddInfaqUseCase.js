const PostInfaq = require('../../Domains/infaq/entities/PostInfaq');

class AddInfaqUseCase {
    constructor({ infaqRepository }) {
        this._infaqRepository = infaqRepository;
    }

    async execute(useCasePayload) {
        const postInfaq = new PostInfaq(useCasePayload);
        return this._infaqRepository.createInfaq(postInfaq);
    }
}

module.exports = AddInfaqUseCase;