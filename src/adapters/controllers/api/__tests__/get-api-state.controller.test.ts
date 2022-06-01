import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { getApiStateControllerFactory } from '@adapters/controllers/api/get-api-state.controller';

describe('getApiStateController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfGetApiState = jest.fn();
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await getApiStateControllerFactory(
            mockOfGetApiState,
            jest.fn(),
        )(mockOfCtx);

        // Then
        expect(
            mockOfCtx.requestTracker.requestedGetApiState,
        ).toHaveBeenCalledTimes(1);
    });
});
