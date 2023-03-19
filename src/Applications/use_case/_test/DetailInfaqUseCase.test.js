const DetailInfaqUseCase = require('../DetailInfaqUseCase');
const DetailInfaq = require('../../../Domains/infaq/entities/DetailInfaq');
const PostedInfaq = require('../../../Domains/infaq/entities/PostedInfaq');
const InfaqRepository = require('../../../Domains/infaq/InfaqRepository');

describe('DetailInfaqUseCase', () => {
    it('should orchestrating the detail infaq action correctly', async () => {
        const useCasePayload = {
            infaqId: 'infaq-123',
        }

        const useCaseInfaq = {
            id: 'infaq-123',
            date: '2021-08-08',
            total: 100000,
            ownerId: 'user-123',
        };

        const expectedDetailInfaq = new PostedInfaq({
            ...useCaseInfaq,
        })

        const mockInfaqRepository = new InfaqRepository();

        mockInfaqRepository.getInfaqById = jest.fn()
            .mockImplementation(() => Promise.resolve(useCaseInfaq));

        const detailInfaqUseCase = new DetailInfaqUseCase({
            infaqRepository: mockInfaqRepository,
        });

        const detailInfaq = await detailInfaqUseCase.execute(useCasePayload);

        expect(mockInfaqRepository.getInfaqById).toBeCalledWith(useCasePayload.infaqId);
        expect(detailInfaq).toEqual({ infaq: expectedDetailInfaq });
    });
});