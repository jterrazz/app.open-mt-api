import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createMockOfTrackerRepository } from '@application/contracts/__tests__/tracker.mock';
import { handleRequestTrackerMiddlewareFactory } from '@adapters/middlewares/handle-request-tracker';
import { initTrackerForRequestFactory } from '@domain/tracker/init-tracker-for-request';

describe('handleRequestTrackerMiddleware()', () => {
    const ctx = createMockOfInitiatedKoaContext({
        response: { body: null, status: null },
    });

    test('handles the full lifecycle of a request', async () => {
        // Given
        const next = jest.fn();

        // When
        const initTracker = initTrackerForRequestFactory(
            createMockOfTrackerRepository(),
        );
        await handleRequestTrackerMiddlewareFactory(initTracker)(ctx, next);

        // Then
        expect(ctx.requestTracker.start).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(1);
        expect(ctx.requestTracker.stop).toHaveBeenCalledTimes(1);
    });
});
