import { Currency } from '@domain/currency/currency';
import { createMockOfProductRepository } from '@domain/product/__tests__/product-repository.mock';
import { createProductFactory } from '@application/use-cases/product/create-product';

const createMockOfArgs = () => {
    const mockOfNewProduct = {
        name: 'the_product_name',
        priceCentsAmount: 4200,
        priceCurrency: 'EUR' as Currency,
    };
    const mockOfProductRepository = createMockOfProductRepository({
        persist: jest.fn().mockResolvedValue('persisted-product'),
    });

    return {
        mockOfNewProduct,
        mockOfProductRepository,
    };
};

describe('use-cases / create product', function () {
    it('creates a new product for a shop', async function () {
        // Given
        const { mockOfNewProduct, mockOfProductRepository } =
            createMockOfArgs();

        // When
        const result = await createProductFactory(mockOfProductRepository)(
            mockOfNewProduct,
            0,
        );

        // Then
        expect(result).toEqual('persisted-product');
    });
});
