import { UnprocessableEntityClientError } from '@domain/error/client/unprocessable-entity-client-error';
import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { deserializeCreateProductKoaRequest } from '@adapters/serializers/routes/product/deserialize-create-product-koa-request';

describe('deserializeCreateProductKoaRequest()', () => {
    test('returns deserialized data', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext(
            {
                request: {
                    body: {
                        name: 'test-name',
                        priceCentsAmount: 123,
                        priceCurrency: 'EUR',
                    },
                },
            },
            true,
        );

        // When
        const result = deserializeCreateProductKoaRequest(ctx);

        // Then
        expect(result).toEqual({
            authenticatedUser: expect.anything(),
            productParams: {
                name: 'test-name',
                priceCentsAmount: 123,
                priceCurrency: 'EUR',
            },
        });
    });

    test('fails to return deserialized data with a wrong price currency', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext(
            {
                request: {
                    body: {
                        name: 'test-name',
                        priceCentsAmount: 123,
                        priceCurrency: 'WRONG',
                    },
                },
            },
            true,
        );

        // When
        const ft = () => deserializeCreateProductKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityClientError);
    });

    test('fails to return deserialized data with a missing name', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext(
            {
                request: {
                    body: {
                        priceCentsAmount: 123,
                        priceCurrency: 'EUR',
                    },
                },
            },
            true,
        );

        // When
        const ft = () => deserializeCreateProductKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityClientError);
    });

    test('fails to return deserialized data with a missing price amount', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext(
            {
                request: {
                    body: {
                        name: 'test-name',
                        priceCurrency: 'EUR',
                    },
                },
            },
            true,
        );

        // When
        const ft = () => deserializeCreateProductKoaRequest(ctx);

        // Then
        expect(ft).toThrow(UnprocessableEntityClientError);
    });
});
