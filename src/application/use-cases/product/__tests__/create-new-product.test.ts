import { createMockOfProductRepository } from '@domain/product/__tests__/product-repository.mock';
import { createMockOfTrackerRepository } from '@application/contracts/__tests__/tracker.mock';
import { createNewProductFactory } from '@application/use-cases/product/create-product';

describe('use-case - create new product', function () {
    it('create a new product for the authenticated user', async function () {
        // Given
        const product = {
            name: 'the-product-name',
            priceCentsAmount: 4200,
            priceCurrency: 'EUR',
        };
        const createNewProduct = createNewProductFactory(
            createMockOfProductRepository(),
            createMockOfTrackerRepository(),
        );

        // When
        const result = await createNewProduct(product);

        // Then
        expect(result).toEqual(product);
    });
});
