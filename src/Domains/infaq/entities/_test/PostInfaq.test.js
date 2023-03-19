const PostInfaq = require('../PostInfaq');

describe('PostInfaq Entities', () => {
    it('should throw error when payload not contain needed property', () => {
        // Arrange
        const payload = {
            total: 10000,
        };

        // Action and Assert
        expect(() => new PostInfaq(payload)).toThrowError('POST_INFAQ.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            total: 10000,
            ownerId: 123,
        };

        // Action and Assert
        expect(() => new PostInfaq(payload)).toThrowError('POST_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            total: '10000',
            ownerId: 'user-123',
        };

        // Action and Assert
        expect(() => new PostInfaq(payload)).toThrowError('POST_INFAQ.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should create postInfaq object correctly', () => {
        // Arrange
        const payload = {

            total: 10000,
            ownerId: 'user-123',
        };

        // Action
        const postInfaq = new PostInfaq(payload);

        // Assert
        expect(postInfaq).toBeInstanceOf(PostInfaq);
        expect(postInfaq.total).toEqual(payload.total);
        expect(postInfaq.ownerId).toEqual(payload.ownerId);
    });
});