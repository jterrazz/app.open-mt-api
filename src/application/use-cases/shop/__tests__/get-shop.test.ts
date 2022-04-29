import { createMockOfShopRepository } from '@domain/shop/__tests__/shop.repository.mock';
import { getShopFactory } from '@application/use-cases/shop/get-shop';

describe('use-cases / getShop()', () => {
    test('returns public properties of a shop', async () => {
        // Given
        const mockOfShopRepository = createMockOfShopRepository();

        // When
        const result = await getShopFactory(mockOfShopRepository)('');

        // Then
        expect(result).toEqual({
            description: 'the_description',
            handle: 'the_handle',
            name: 'the_name',
        });
    });
});
