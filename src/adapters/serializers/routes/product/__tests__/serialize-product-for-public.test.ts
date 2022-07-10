import { ProductEntity } from '@domain/product/product.entity';
import { serializeProductForPublic } from '@adapters/serializers/routes/product/serialize-product-for-public';

describe('serializeProductForPublic()', () => {
    test('returns public properties of a product', async () => {
        // Given
        const product: ProductEntity = {
            id: 0,
            name: 'product-name',
            priceCentsAmount: 100,
            priceCurrency: 'USD',
            shopId: 0, // TODO Remove, doesn't make sense here
            // description: 'product-description', // TODO Add here
            // imageUrl: 'product-image-url',
        };

        // When
        const result = serializeProductForPublic(product);

        // Then
        expect(result).toEqual({
            id: product.id,
            name: product.name,
            priceCentsAmount: product.priceCentsAmount,
            priceCurrency: product.priceCurrency,
        });
    });
});
