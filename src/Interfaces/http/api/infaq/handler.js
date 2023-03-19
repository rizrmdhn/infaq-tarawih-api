const AddInfaqUseCase = require('../../../../Applications/use_case/AddInfaqUseCase');
const GetInfaqUseCase = require('../../../../Applications/use_case/GetInfaqUseCase');
const DetailInfaqUseCase = require('../../../../Applications/use_case/DetailInfaqUseCase');

class InfaqHandler {
    constructor(container) {
        this._container = container;

        this.postInfaqHandler = this.postInfaqHandler.bind(this);
        this.getInfaqHandler = this.getInfaqHandler.bind(this);
        this.getInfaqByIdHandler = this.getInfaqByIdHandler.bind(this);
    }

    async postInfaqHandler(request, h) {
        const addInfaqUseCase = this._container.getInstance(AddInfaqUseCase.name);
        const { id: credentialId } = request.auth.credentials;

        const useCasePayload = {
            ...request.payload,
            ownerId: credentialId,
        };

        const addedInfaq = await addInfaqUseCase.execute(useCasePayload);

        const response = h.response({
            status: 'success',
            message: 'Infaq berhasil ditambahkan',
            data: {
                infaqId: addedInfaq.id,
            },
        });
        response.code(201);
        return response;
    }

    async getInfaqHandler() {
        const getInfaqUseCase = this._container.getInstance(GetInfaqUseCase.name);
        const infaq = await getInfaqUseCase.execute();

        return {
            status: 'success',
            data: {
                infaq,
            },
        };
    }

    async getInfaqByIdHandler(request, h) {
        const detailInfaqUseCase = this._container.getInstance(DetailInfaqUseCase.name);

        const useCasePayload = {
            infaqId: request.params.infaqId,
        };

        const detailInfaq = await detailInfaqUseCase.execute(useCasePayload);

        return {
            status: 'success',
            data: {
                ...detailInfaq,
            },
        };
    }
}

module.exports = InfaqHandler;