import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import {
    deserializeGetShopKoaRequest,
    serializeGetShopKoaResponse,
} from '@adapters/serializers/shop/get-shop-koa-serializer';

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

describe('deserializeGetShopKoaRequest()', () => {
    test('succeeds if all params are provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            params: { shopHandle: 'the_handle' },
        });

        // When
        const result = deserializeGetShopKoaRequest(ctx);

        // Then
        expect(result).toEqual({ shopHandle: 'the_handle' });
    });

    test('fails if no shop handle is provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({ params: {} });

        // When
        const ft = () => deserializeGetShopKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityError);
    });
});
