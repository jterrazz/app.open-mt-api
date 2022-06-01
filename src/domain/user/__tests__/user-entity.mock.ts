import { UserEntity } from '../user.entity';

export const createMockOfUser = (
    partialUser: Partial<jest.Mocked<UserEntity>> = {},
): jest.Mocked<UserEntity> => ({
    authentication: {
        email: 'string',
        hashedPassword: 'string',
    },
    id: 0,
    profile: {
        firstName: 'string',
        lastName: 'string',
    },
    settings: {
        language: 'FR',
    },
    ...partialUser,
});
