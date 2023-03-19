const PostedInfaq = require('../PostedInfaq');

describe('PostedInfaq Entities', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            total: 10000,
        };

        // Action and Assert
        expect(() => new PostedInfaq(payload)).toThrowError('POSTED_INFAQ.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload id, date, ownerId is not a string', () => {
        // Arrange
        const payload = {
            id: 123,
            date: 20210201,
            total: 10000,
            ownerId: 123,
        };

        // Action and Assert
        expect(() => new PostedInfaq(payload)).toThrowError('POSTED_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when payload total is not a number', () => {
        // Arrange
        const payload = {
            id: 'infaq-123',
            date: '2021-01-01',
            total: '10000',
            ownerId: 'user-123',
        };

        // Action and Assert
        expect(() => new PostedInfaq(payload)).toThrowError('POSTED_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create postedInfaq object correctly', () => {
        // Arrange
        const payload = {
            id: 'infaq-123',
            date: '2021-01-01',
            total: 10000,
            ownerId: 'user-123',
        };

        // Action
        const postedInfaq = new PostedInfaq(payload);

        // Assert
        expect(postedInfaq).toBeInstanceOf(PostedInfaq);
        expect(postedInfaq.id).toEqual(payload.id);
        expect(postedInfaq.total).toEqual(payload.total);
        expect(postedInfaq.ownerId).toEqual(payload.ownerId);
    });
});