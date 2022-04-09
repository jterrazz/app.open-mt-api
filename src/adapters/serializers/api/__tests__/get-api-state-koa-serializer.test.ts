import { GetApiStateKoaSerializer } from '@adapters/serializers/api/get-api-state-koa-serializer';
import { createMockOfInitiatedKoaContext } from '@adapters/contracts/__tests__/initiated-koa-context.mock';
import { useFakeTimers, useRealTimers } from '@application/utils/node/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('GetApiStateKoaSerializer', () => {
    const getApiStateKoaSerializer = new GetApiStateKoaSerializer();

    describe('serializeResponse()', () => {
        test('with basic response', async () => {
            // Given
            const ctx = createMockOfInitiatedKoaContext();
            const props = {
                env: 'the_env',
                state: 'the_state',
                time: new Date(),
                version: 'string',
            };

            // When
            getApiStateKoaSerializer.serializeResponse(ctx, props);

            // Then
            expect(ctx.body).toEqual({
                env: 'the_env',
                state: 'the_state',
                time: '2000-01-01T00:00:00.000Z',
                version: 'string',
            });
        });
    });
});