import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { logInControllerFactory } from '@adapters/controllers/authentication/log-in.controller';

describe('logInController()', () => {
    test('calls a tracker event', async () => {
        // Given
        const mockOfCtx = createMockOfInitiatedKoaContext();

        // When
        await logInControllerFactory(jest.fn())(mockOfCtx);

        // Then
        expect(mockOfCtx.requestTracker.requestedLogIn).toHaveBeenCalledTimes(
            1,
        );
    });
});
