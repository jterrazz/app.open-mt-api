import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { serializeGetUserKoaResponse } from '@adapters/serializers/routes/user/serialize-get-user-koa-response';

describe('serializeResponse()', () => {
    test('returns basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const params = {
            firstName: 'the_first_name',
            lastName: 'the_last_name',
        };

        // When
        serializeGetUserKoaResponse(ctx, params);

        // Then
        expect(ctx.body).toEqual({
            firstName: 'the_first_name',
            lastName: 'the_last_name',
        });
    });
});
