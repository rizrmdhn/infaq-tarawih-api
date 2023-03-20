const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
const GetOwnProfileUseCase = require('../../../../Applications/use_case/GetOwnProfileUseCase');
const GetAllUsersUseCase = require('../../../../Applications/use_case/GetAllUsersUseCase');

class UsersHandler {
    constructor(container) {
        this._container = container;

        this.postUserHandler = this.postUserHandler.bind(this);
        this.getOwnProfileHandler = this.getOwnProfileHandler.bind(this);
        this.getAllUsersHandler = this.getAllUsersHandler.bind(this);
    }

    async postUserHandler(request, h) {
        const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
        const addedUser = await addUserUseCase.execute(request.payload);
        const response = h.response({
            status: 'success',
            data: {
                addedUser,
            },
        });
        response.code(201);
        return response;
    }

    async getOwnProfileHandler(request) {
        const getOwnProfileUseCase = this._container.getInstance(GetOwnProfileUseCase.name);
        const { id: credentialId } = request.auth.credentials;
        const user = await getOwnProfileUseCase.execute({ userId: credentialId });

        return {
            status: 'success',
            data: {
                user,
            },
        };
    }

    async getAllUsersHandler() {
        const getAllUsersUseCase = this._container.getInstance(GetAllUsersUseCase.name);
        const users = await getAllUsersUseCase.execute();

        return {
            status: 'success',
            data: {
                users,
            },
        };
    }
}

module.exports = UsersHandler;