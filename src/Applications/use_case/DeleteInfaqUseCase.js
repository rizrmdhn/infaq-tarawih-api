class DeleteInfaqUseCase {
    constructor({ infaqRepository }) {
        this._infaqRepository = infaqRepository;
    }

    async execute(useCasePayload) {
        this._verifyPayload(useCasePayload);
        const { infaqId } = useCasePayload;
        await this._infaqRepository.getInfaqById(infaqId);
        await this._infaqRepository.deleteInfaqById(infaqId);
    }

    _verifyPayload(useCasePayload) {

        const { infaqId } = useCasePayload;

        if (!infaqId) {
            throw new Error('DELETE_INFAQ_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof infaqId !== 'string') {
            throw new Error('DELETE_INFAQ_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = DeleteInfaqUseCase;