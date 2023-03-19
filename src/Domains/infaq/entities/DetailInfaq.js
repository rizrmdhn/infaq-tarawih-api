class DetailInfaq {
    constructor(payload) {
        this._verifyPayload(payload);

        const { infaqId } = payload;
        this.infaqId = infaqId;
    }

    _verifyPayload(payload) {
        const { infaqId } = payload;

        if (!infaqId) {
            throw new Error('DETAIL_INFAQ.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof infaqId !== 'string') {
            throw new Error('DETAIL_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = DetailInfaq