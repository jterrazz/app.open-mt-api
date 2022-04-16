const mockOfGetShopFactory = jest.fn();
jest.mock('../../../application/use-cases/shop/get-shop', () => ({
    getShopFactory: mockOfGetShopFactory,
}));

import { NotFoundError } from '@domain/error/client/not-found-error';
import { createMockOfInitiatedKoaContext } from '@adapters/__tests__/initiated-koa-context.mock';
import { createMockOfShopRepository } from '@domain/shop/__tests__/shop-repository.mock';
import { shopControllerFactory } from '@adapters/controllers/shop-controller';

describe('shop-controller', () => {
    const shopController = shopControllerFactory(createMockOfShopRepository());

    describe('getShop()', () => {
        const mockOfCtx = createMockOfInitiatedKoaContext({
            params: { shopHandle: 'the_handle' },
        });

        test('fails if no user is found', async () => {
            // Given
            mockOfGetShopFactory.mockReturnValue(async () => null);

            // When
            const ft = () => shopController.getShop(mockOfCtx);

            // Then
            await expect(ft).rejects.toThrow(NotFoundError);
        });
    });
});
