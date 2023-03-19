class PostInfaq {
    constructor(payload) {
        this._verifyPayload(payload);
        const { total, ownerId } = payload;

        this.total = total;
        this.ownerId = ownerId;
    }

    _verifyPayload(payload) {
        const { total, ownerId } = payload;
        if (!total || !ownerId) {
            throw new Error('POST_INFAQ.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof ownerId !== 'string' || typeof total !== 'number') {
            throw new Error('POST_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = PostInfaq;