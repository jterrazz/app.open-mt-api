import { IInitiatedKoaContext } from '@adapters/controllers/koa-controller';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { createMockOfTrackerRepository } from '@domain/tracker/__tests__/tracker-repository.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const createMockOfInitiatedKoaContext = (
    overrideParams?:
        | Partial<IInitiatedKoaContext>
        | { response: any }
        | { request: any },
    withAuthenticatedUser = false,
): IInitiatedKoaContext => {
    return {
        ...createMockContext(),
        authenticatedUser: withAuthenticatedUser
            ? createMockOfUser()
            : undefined,
        logout: jest.fn(),
        requestTracker: createMockOfTrackerRepository(),
        ...overrideParams,
    };
};
