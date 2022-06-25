import { IUserRepository } from '@domain/user/user.repository';
import { createMockOfUserEntity } from '@domain/user/__mocks__/user-entity.mock';

// TODO add jest.mocked partout
export const createMockOfUserRepository = (
    partialUserRepository: Partial<jest.Mocked<IUserRepository>> = {},
): jest.Mocked<IUserRepository> => ({
    add: jest.fn().mockImplementation(async (input) => input),
    findByEmail: jest.fn().mockResolvedValue(createMockOfUserEntity()),
    findById: jest.fn().mockResolvedValue(createMockOfUserEntity()),
    ...partialUserRepository,
});
