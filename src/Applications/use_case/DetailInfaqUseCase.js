const DetailInfaq = require('../../Domains/infaq/entities/DetailInfaq');

class DetailInfaqUseCase {
    constructor({ infaqRepository }) {
        this._infaqRepository = infaqRepository;
    }

    async execute(useCasePayload) {
        const { infaqId } = new DetailInfaq(useCasePayload);
        const detailInfaq = await this._infaqRepository.getInfaqById(infaqId);

        return {
            infaq: detailInfaq,
        }
    }
}

module.exports = DetailInfaqUseCase;