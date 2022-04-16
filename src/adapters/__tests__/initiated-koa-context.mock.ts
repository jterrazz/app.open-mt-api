import { IInitiatedKoaContext } from '@adapters/controllers';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { createMockOfTrackerRepository } from '@application/contracts/__tests__/tracker.mock';

export const createMockOfInitiatedKoaContext = (
    overrideParams?: Partial<IInitiatedKoaContext> | any,
): IInitiatedKoaContext => {
    return {
        ...createMockContext(),
        authenticatedUser: undefined,
        requestTracker: createMockOfTrackerRepository(),
        ...overrideParams,
    };
};
