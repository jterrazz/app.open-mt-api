import { CurrencyEntity } from '@domain/currency/currency.entity';
import { ForbiddenClientError } from '@domain/error/client/forbidden-client-error';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { createMockOfProductEntity } from '@domain/product/__tests__/product.entity.mock';
import { createMockOfProductRepository } from '@domain/product/__tests__/product.repository.mock';
import { createMockOfShopEntity } from '@domain/shop/__tests__/shop.entity.mock';
import { createMockOfShopRepository } from '@domain/shop/__tests__/shop.repository.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';
import { modifyProductByIdFactory } from '@application/use-cases/product/modify-product-by-id';

const createMockOfParams = () => {
    const mockOfAuthenticatedUser = createMockOfUser({ id: 0 });
    const mockOfProductRepository = createMockOfProductRepository({
        findByProductId: jest.fn().mockResolvedValue(
            createMockOfProductEntity({
                id: 0,
                shopId: 0,
            }),
        ),
    });
    const mockOfShopRepository = createMockOfShopRepository({
        findByOwnerId: jest
            .fn()
            .mockResolvedValue(createMockOfShopEntity({ id: 0 })),
    });
    const newProductParams = {
        name: 'the_new_name',
        priceCentsAmount: 1,
        priceCurrency: 'USD' as CurrencyEntity,
    };

    return {
        mockOfAuthenticatedUser,
        mockOfProductRepository,
        mockOfShopRepository,
        newProductParams,
    };
};

describe('use-cases / modifyProductByIdFactory()', () => {
    test('returns modified product', async () => {
        // Given
        const {
            mockOfProductRepository,
            mockOfShopRepository,
            mockOfAuthenticatedUser,
            newProductParams,
        } = createMockOfParams();

        // When
        const result = await modifyProductByIdFactory(
            mockOfProductRepository,
            mockOfShopRepository,
        )(mockOfAuthenticatedUser, 0, newProductParams);

        // Then
        expect(result).toEqual({
            id: 0,
            name: 'the_new_name',
            priceCentsAmount: 1,
            priceCurrency: 'USD',
            shopId: 0,
        });
    });

    test('rejects unknown products with a NotFoundError', async () => {
        // Given
        const {
            mockOfAuthenticatedUser,
            newProductParams,
            mockOfShopRepository,
        } = createMockOfParams();
        const mockOfProductRepository = createMockOfProductRepository({
            findByProductId: jest.fn().mockResolvedValue(null),
        });

        // When
        const ft = () =>
            modifyProductByIdFactory(
                mockOfProductRepository,
                mockOfShopRepository,
            )(mockOfAuthenticatedUser, 0, newProductParams);

        // Then
        await expect(ft).rejects.toThrow(NotFoundClientError);
    });

    test('rejects non matching authenticated user to product owner with a ForbiddenError', async () => {
        // Given
        const {
            mockOfAuthenticatedUser,
            newProductParams,
            mockOfShopRepository,
        } = createMockOfParams();
        const mockOfProductEntity = createMockOfProductEntity({
            id: 0,
            shopId: 2,
        });
        const mockOfProductRepository = createMockOfProductRepository({
            findByProductId: jest.fn().mockResolvedValue(mockOfProductEntity),
        });

        // When
        const ft = () =>
            modifyProductByIdFactory(
                mockOfProductRepository,
                mockOfShopRepository,
            )(mockOfAuthenticatedUser, 0, newProductParams);

        // Then
        await expect(ft).rejects.toThrow(ForbiddenClientError);
        expect(mockOfShopRepository.merge).toHaveBeenCalledTimes(0);
    });
});
