import { apiControllerFactory } from '@adapters/controllers/api.controller';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';

describe('controllers / api', () => {
    describe('getState()', () => {
        test('calls a tracker event', async () => {
            // Given
            const mockOfGetApiState = jest.fn();
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            await apiControllerFactory(mockOfGetApiState, jest.fn()).getState(
                mockOfCtx,
            );

            // Then
            expect(
                mockOfCtx.requestTracker.requestedGetApiState,
            ).toHaveBeenCalledTimes(1);
        });
    });
});
