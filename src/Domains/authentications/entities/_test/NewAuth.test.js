const NewAuth = require('../NewAuth');

describe('a NewAuth entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        // Arrange
        const payload = {
            accessToken: 'accessToken',
        };

        // Action and Assert
        expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        // Arrange
        const payload = {
            accessToken: 'accessToken',
            refreshToken: 123,
        };

        // Action and Assert
        expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newAuth entities correctly', () => {
        // Arrange
        const payload = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };

        // Action
        const newAuth = new NewAuth(payload);

        // Assert
        expect(newAuth).toBeInstanceOf(NewAuth);
        expect(newAuth.accessToken).toEqual(payload.accessToken);
        expect(newAuth.refreshToken).toEqual(payload.refreshToken);
     });
});