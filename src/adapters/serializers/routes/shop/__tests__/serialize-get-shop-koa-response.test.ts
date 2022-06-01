import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { serializeGetShopKoaResponse } from '@adapters/serializers/routes/shop/serialize-get-shop-koa-response';

describe('serializeGetShopKoaResponse()', () => {
    test('with basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const params = {
            description: 'the_description',
            handle: 'the_handle',
            name: 'the_name',
        };

        // When
        serializeGetShopKoaResponse(ctx, params);

        // Then
        expect(ctx.body).toEqual({
            description: 'the_description',
            handle: 'the_handle',
            name: 'the_name',
        });
    });
});
