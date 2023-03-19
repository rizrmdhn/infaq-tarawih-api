class PostedInfaq {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, date, total, ownerId } = payload;

        this.id = id;
        this.date = date;
        this.total = total;
        this.ownerId = ownerId;
    }

    _verifyPayload(payload) {
        const { id, date, total, ownerId } = payload;

        if (!id || !date || !total || !ownerId) {
            throw new Error('POSTED_INFAQ.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'string' || typeof ownerId !== 'string' || typeof date !== 'string' || typeof total !== 'number') {
            throw new Error('POSTED_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = PostedInfaq;