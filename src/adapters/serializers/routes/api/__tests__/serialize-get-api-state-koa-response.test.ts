import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { serializeGetApiStateKoaResponse } from '@adapters/serializers/routes/api/serialize-get-api-state-koa-response';
import { useFakeTimers, useRealTimers } from '@tests/utils/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('serializeGetApiStateKoaResponse()', () => {
    test('with a basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const props = {
            env: 'the_env',
            state: 'the_state',
            time: new Date(),
            version: 'string',
        };

        // When
        serializeGetApiStateKoaResponse(ctx, props);

        // Then
        expect(ctx.body).toEqual({
            env: 'the_env',
            state: 'the_state',
            time: '2000-01-01T00:00:00.000Z',
            version: 'string',
        });
    });
});
