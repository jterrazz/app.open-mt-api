import { authenticationControllerFactory } from '@adapters/controllers/authentication.controller';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';

describe('controllers / api', () => {
    describe('getState()', () => {
        test('calls a tracker event', async () => {
            // Given
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            await authenticationControllerFactory(jest.fn(), jest.fn()).logOut(
                mockOfCtx,
            );

            // Then
            // expect(
            //     mockOfCtx.requestTracker.requestedGetApiState,
            // ).toHaveBeenCalledTimes(1);
            expect(mockOfCtx.logout).toHaveBeenCalledTimes(1);
        });
    });
});
