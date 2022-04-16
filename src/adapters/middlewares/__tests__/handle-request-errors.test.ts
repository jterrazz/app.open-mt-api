import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createMockOfLogger } from '@application/contracts/__tests__/logger.mock';
import { handleRequestErrorsMiddlewareFactory } from '@adapters/middlewares/handle-request-errors';

describe('handleRequestErrorsMiddleware()', () => {
    const ctx = createMockOfInitiatedKoaContext({
        response: { body: null, status: null },
    });

    test('respond with client errors details', async () => {
        // Given
        const next = async () => {
            throw new NotFoundError('test-error');
        };

        // When
        await handleRequestErrorsMiddlewareFactory(createMockOfLogger())(
            ctx,
            next,
        );

        // Then
        expect(ctx.response.status).toEqual(404);
        expect(ctx.response.body).toEqual({
            message: 'test-error',
        });
    });

    test('respond with internal errors for any random error', async () => {
        // Given
        const next = async () => {
            throw new Error('a random error');
        };

        // When
        await handleRequestErrorsMiddlewareFactory(createMockOfLogger())(
            ctx,
            next,
        );

        // Then
        expect(ctx.response.status).toEqual(500);
        expect(ctx.response.body).toEqual({
            message: 'Internal Server Error',
        });
    });
});
