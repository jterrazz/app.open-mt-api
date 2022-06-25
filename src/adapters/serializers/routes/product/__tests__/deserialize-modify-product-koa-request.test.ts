import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { deserializeModifyProductKoaRequest } from '@adapters/serializers/routes/product/deserialize-modify-product-koa-request';

describe('deserializeModifyProductKoaRequest()', () => {
    test('succeed with a name update', async () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext(
            {
                params: {
                    productId: '1',
                },
                request: {
                    body: {
                        name: 'new name',
                    },
                },
            },
            true,
        );

        // When
        const result = deserializeModifyProductKoaRequest(ctx);

        // Then
        expect(result).toEqual({
            authenticatedUser: expect.anything(),
            productId: 1,
            productParams: {
                name: 'new name',
            },
        });
    });
});
