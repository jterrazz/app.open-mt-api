import { createMockOfInitiatedKoaContext } from '../../../infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { createMockOfLogger } from '../../../application/contracts/__mocks__/logger.mock';
import { handleAuthenticatedUserMiddlewareFactory } from '../handle-authenticated-user.middleware';

const handleAuthenticatedUserMiddleware =
    handleAuthenticatedUserMiddlewareFactory(createMockOfLogger());

describe('handleAuthenticatedUserMiddleware', () => {
    test('sets the authenticated user in the context', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            state: { user: { id: 'test-user-id' } },
        });

        // When
        await handleAuthenticatedUserMiddleware(ctx, async () => {});

        // Then
        expect(ctx.authenticatedUser).toEqual({ id: 'test-user-id' });
    });

    test('does not set the authenticated user in the context if there is no user', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            state: { user: null },
        });

        // When
        await handleAuthenticatedUserMiddleware(ctx, async () => {});

        // Then
        expect(ctx.authenticatedUser).toBeNull();
    });
});
