const DetailInfaq = require('../DetailInfaq');

describe('DetailInfaq Entities', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {};

        // Action and Assert
        expect(() => new DetailInfaq(payload)).toThrowError('DETAIL_INFAQ.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            infaqId: 123,
        };

        // Action and Assert
        expect(() => new DetailInfaq(payload)).toThrowError('DETAIL_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create detailInfaq object correctly', () => {
        // Arrange
        const payload = {
            infaqId: 'infaq-123',
        };

        // Action
        const detailInfaq = new DetailInfaq(payload);

        // Assert
        expect(detailInfaq).toBeInstanceOf(DetailInfaq);
        expect(detailInfaq.infaqId).toEqual(payload.infaqId);
    });
});