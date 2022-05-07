import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { logOutControllerFactory } from '@adapters/controllers/authentication/log-out.controller';

describe('logOutController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await logOutControllerFactory(jest.fn())(mockOfCtx);

        // Then
        expect(mockOfCtx.requestTracker.requestedLogOut).toHaveBeenCalledTimes(
            1,
        );
    });

    test('logs out user', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await logOutControllerFactory(jest.fn())(mockOfCtx);

        // Then
        expect(mockOfCtx.logout).toHaveBeenCalledTimes(1);
    });
});
