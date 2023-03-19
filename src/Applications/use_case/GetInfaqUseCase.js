const PostedInfaq = require('../../Domains/infaq/entities/PostedInfaq');

class GetInfaqUseCase {
    constructor({ infaqRepository }) {
        this._infaqRepository = infaqRepository;
    }

    async execute() {
        const infaq = await this._infaqRepository.getInfaqs();
        return infaq.map((infaqs) => new PostedInfaq(infaqs));
    }
}

module.exports = GetInfaqUseCase;