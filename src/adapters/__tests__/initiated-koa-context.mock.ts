import { IInitiatedKoaContext } from '@adapters/controllers';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { createMockOfTrackerRepository } from '@application/contracts/__tests__/tracker.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const createMockOfInitiatedKoaContext = (
    overrideParams?: Partial<IInitiatedKoaContext>,
    withAuthenticatedUser = false,
): IInitiatedKoaContext => {
    return {
        ...createMockContext(),
        authenticatedUser: withAuthenticatedUser
            ? createMockOfUser()
            : undefined,
        requestTracker: createMockOfTrackerRepository(),
        ...overrideParams,
    };
};
