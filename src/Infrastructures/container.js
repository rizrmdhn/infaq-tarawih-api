/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external dependencies
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// service (repository, helper, manager, etc)
const PasswordHash = require('../Applications/security/PasswordHash');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

const UserRepository = require('../Domains/users/UserRepository');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');

const infaqRepository = require('../Domains/infaq/InfaqRepository');
const InfaqRepositoryPostgres = require('./repository/InfaqRepositoryPostgres');

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const JwtTokenManager = require('./security/JwtTokenManager');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const AddInfaqUseCase = require('../Applications/use_case/AddInfaqUseCase');
const GetInfaqUseCase = require('../Applications/use_case/GetInfaqUseCase');
const DetailInfaqUseCase = require('../Applications/use_case/DetailInfaqUseCase');
const DeleteInfaqUseCase = require('../Applications/use_case/DeleteInfaqUseCase');
const GetOwnProfileUseCase = require('../Applications/use_case/GetOwnProfileUseCase');
const GetAllUsersUseCase = require('../Applications/use_case/GetAllUsersUseCase');


// creating container
const container = createContainer();

// registering services and repository
container.register([
    {
        key: UserRepository.name,
        Class: UserRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    },
    {
        key: AuthenticationRepository.name,
        Class: AuthenticationRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
            ],
        },
    },
    {
        key: PasswordHash.name,
        Class: BcryptPasswordHash,
        parameter: {
            dependencies: [
                {
                    concrete: bcrypt,
                },
            ],
        },
    },
    {
        key: AuthenticationTokenManager.name,
        Class: JwtTokenManager,
        parameter: {
            dependencies: [
                {
                    concrete: Jwt.token,
                },
            ],
        },
    },
    {
        key: infaqRepository.name,
        Class: InfaqRepositoryPostgres,
        parameter: {
            dependencies: [
                {
                    concrete: pool,
                },
                {
                    concrete: nanoid,
                },
            ],
        },
    },
]);

// registering use cases
container.register([
    {
        key: AddUserUseCase.name,
        Class: AddUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name,
                },
            ],
        },
    },
    {
        key: LoginUserUseCase.name,
        Class: LoginUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
                {
                    name: 'authenticationTokenManager',
                    internal: AuthenticationTokenManager.name,
                },
                {
                    name: 'passwordHash',
                    internal: PasswordHash.name,
                },
            ],
        },
    },
    {
        key: LogoutUserUseCase.name,
        Class: LogoutUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
            ],
        },
    },
    {
        key: RefreshAuthenticationUseCase.name,
        Class: RefreshAuthenticationUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'authenticationRepository',
                    internal: AuthenticationRepository.name,
                },
                {
                    name: 'authenticationTokenManager',
                    internal: AuthenticationTokenManager.name,
                },
            ],
        },
    },
    {
        key: AddInfaqUseCase.name,
        Class: AddInfaqUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'infaqRepository',
                    internal: infaqRepository.name,
                },
            ],
        },
    },
    {
        key: GetInfaqUseCase.name,
        Class: GetInfaqUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'infaqRepository',
                    internal: infaqRepository.name,
                },
            ],
        },
    },
    {
        key: DetailInfaqUseCase.name,
        Class: DetailInfaqUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'infaqRepository',
                    internal: infaqRepository.name,
                },
            ],
        },
    },
    {
        key: DeleteInfaqUseCase.name,
        Class: DeleteInfaqUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'infaqRepository',
                    internal: infaqRepository.name,
                },
            ],
        },
    },
    {
        key: GetOwnProfileUseCase.name,
        Class: GetOwnProfileUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
            ],
        },
    },
    {
        key: GetAllUsersUseCase.name,
        Class: GetAllUsersUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name,
                },
            ],
        },
    },
]);

module.exports = container;