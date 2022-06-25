import { createMockOfShopRepository } from '@domain/shop/__mocks__/shop.repository.mock';
import { createMockOfUserEntity } from '@domain/user/__mocks__/user-entity.mock';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { useFakeTimers, useRealTimers } from '@tests/utils/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

const createMockOfArgs = () => {
    const mockOfCreateShopParams = {
        bannerImageUrl: 'the_new_banner_image_url',
        description: 'the_new_shop_description',
        handle: 'the_new_shop_handle',
        name: 'the_new_shop_name',
    };
    const mockOfAuthenticatedUser = createMockOfUserEntity({
        id: 0,
    });
    const mockOfShopRepository = createMockOfShopRepository();

    return {
        mockOfAuthenticatedUser,
        mockOfCreateShopParams,
        mockOfShopRepository,
    };
};

describe('use-cases / createShop()', function () {
    test('save a shop and return its public properties', async () => {
        // Given
        const {
            mockOfAuthenticatedUser,
            mockOfCreateShopParams,
            mockOfShopRepository,
        } = createMockOfArgs();

        // When
        const result = await createShopFactory(mockOfShopRepository)(
            mockOfCreateShopParams,
            mockOfAuthenticatedUser,
        );

        // Then
        expect(mockOfShopRepository.add).toHaveBeenCalledWith(
            {
                bannerImageUrl: 'the_new_banner_image_url',
                countFollowers: 0,
                creationDate: new Date(),
                description: 'the_new_shop_description',
                handle: 'the_new_shop_handle',
                id: 0, // TODO To remove !!!!!
                name: 'the_new_shop_name',
            },
            0,
        );
        expect(result).toEqual({
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        });
    });

    test('rejects when it fails to save a shop', async () => {
        // Given
        const { mockOfAuthenticatedUser, mockOfCreateShopParams } =
            createMockOfArgs();
        const mockOfShopRepository = createMockOfShopRepository({
            add: jest.fn().mockRejectedValue(new Error('persist-error')),
        });

        // When
        const ft = () =>
            createShopFactory(mockOfShopRepository)(
                mockOfCreateShopParams,
                mockOfAuthenticatedUser,
            );

        // Then
        await expect(ft).rejects.toThrow('persist-error');
    });
});
