import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import {
    deserializeCreateShopKoaRequest,
    serializeCreateShopKoaResponse,
} from '@adapters/serializers/shop/create-shop-koa-serializer';

describe('serializeCreateShopKoaResponse()', () => {
    test('with basic response', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const params = {
            handle: 'the_handle',
            name: 'the_name',
        };

        // When
        serializeCreateShopKoaResponse(ctx, params);

        // Then
        expect(ctx.body).toEqual({
            handle: 'the_handle',
            name: 'the_name',
        });
    });
});

describe('deserializeCreateShopKoaRequest()', () => {
    const getValidCreateShopBody = () => ({
        handle: 'the_handle',
        name: 'the_name',
    });

    test('succeeds if the request is valid', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            request: {
                body: getValidCreateShopBody(),
            },
        });

        // When
        const result = deserializeCreateShopKoaRequest(ctx);

        // Then
        expect(result).toEqual({ handle: 'the_handle', name: 'the_name' });
    });

    test('fails if no shop handle is provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            request: {
                body: {
                    ...getValidCreateShopBody(),
                    handle: undefined,
                },
            },
        });

        // When
        const ft = () => deserializeCreateShopKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityError);
    });

    test('fails if no shop name is provided', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext({
            request: {
                body: {
                    ...getValidCreateShopBody(),
                    name: undefined,
                },
            },
        });

        // When
        const ft = () => deserializeCreateShopKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityError);
    });
});
