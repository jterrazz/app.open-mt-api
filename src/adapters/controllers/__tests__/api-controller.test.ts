import { apiControllerFactory } from '@adapters/controllers/api-controller';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';

jest.mock('../../serializers/api/get-api-state-koa-serializer', () => ({
    serializeGetApiStateResponse: jest.fn(),
}));

describe('controllers / api', () => {
    describe('getState()', () => {
        test('calls a tracker event', async () => {
            // Given
            const mockOfGetApiState = jest.fn();
            const mockOfCtx = createMockOfInitiatedKoaContext();

            // When
            await apiControllerFactory(mockOfGetApiState).getState(mockOfCtx);

            // Then
            expect(
                mockOfCtx.requestTracker.requestedGetApiState,
            ).toHaveBeenCalledTimes(1);
        });
    });
});
