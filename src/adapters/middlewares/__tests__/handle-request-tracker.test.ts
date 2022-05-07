import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { handleRequestTrackerMiddlewareFactory } from '@adapters/middlewares/handle-request-tracker.middleware';

describe('handleRequestTrackerMiddleware()', () => {
    const ctx = createMockOfInitiatedKoaContext({
        response: { body: null, status: null },
    });

    test('handles the lifecycle of a request', async () => {
        // Given
        const next = jest.fn();
        const initTrackerForRequest = jest.fn().mockReturnValue({
            start: jest.fn(),
            stop: jest.fn(),
        });

        // When
        await handleRequestTrackerMiddlewareFactory(initTrackerForRequest)(
            ctx,
            next,
        );

        // Then
        expect(ctx.requestTracker.start).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(1);
        expect(ctx.requestTracker.stop).toHaveBeenCalledTimes(1);
    });
});
