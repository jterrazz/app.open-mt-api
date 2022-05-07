import { UserEntity } from '../user.entity';

export const createMockOfUser = (
    partialUser: Partial<jest.Mocked<UserEntity>> = {},
): jest.Mocked<UserEntity> => ({
    email: 'string',
    firstName: 'string',
    handle: 'string',
    hashedPassword: 'string',
    id: 0,
    lastName: 'string',
    ...partialUser,
});
