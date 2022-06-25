import { ProductEntity } from '@domain/product/product.entity';
import { createMockOfInitiatedKoaContext } from '@infrastructure/webserver/__tests__/initiated-koa-context.mock';
import { serializeCreateProductKoaResponse } from '@adapters/serializers/routes/product/serialize-create-product-koa-response';

describe('serializeCreateProductKoaResponse', () => {
    it('should return correct response', () => {
        // Given
        const ctx = createMockOfInitiatedKoaContext();
        const productEntity: ProductEntity = {
            id: 1,
            name: 'Test product',
            priceCentsAmount: 100,
            priceCurrency: 'EUR',
            shopId: 1,
        };

        // When
        serializeCreateProductKoaResponse(ctx, productEntity);

        // Then
        expect(ctx.body).toEqual({
            id: 1,
            name: 'Test product',
            priceCentsAmount: 100,
            priceCurrency: 'EUR',
        });
    });
});
