import { IUserRepository } from '@domain/user/user-repository';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

// TODO add jest.mocked partout
export const createMockOfUserRepository = (
    partialUserRepository: Partial<jest.Mocked<IUserRepository>> = {},
): jest.Mocked<IUserRepository> => ({
    findByEmail: jest.fn().mockResolvedValue(createMockOfUser()),
    findById: jest.fn().mockResolvedValue(createMockOfUser()),
    persist: jest.fn().mockImplementation(async (input) => input),
    ...partialUserRepository,
});
