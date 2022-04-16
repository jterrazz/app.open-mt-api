import {
    CreateShopParams,
    createShopFactory,
} from '@application/use-cases/shop/create-shop';
import { createMockOfShopRepository } from '@domain/shop/__tests__/shop-repository.mock';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';
import { useFakeTimers, useRealTimers } from '@application/utils/node/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

const mockOfCreateShopParams: CreateShopParams = {
    bannerImageUrl: 'the_new_banner_image_url',
    description: 'the_new_shop_description',
    handle: 'the_new_shop_handle',
    name: 'the_new_shop_name',
};
const mockOfAuthenticatedUser = createMockOfUser();

describe('use-case - createShop()', function () {
    test('save a shop and return its public properties', async () => {
        // When
        const mockOfShopRepository = createMockOfShopRepository();
        const createShop = createShopFactory(mockOfShopRepository);
        const result = await createShop(
            mockOfCreateShopParams,
            mockOfAuthenticatedUser,
        );

        // Then
        expect(mockOfShopRepository.persist).toHaveBeenCalledWith({
            bannerImageUrl: 'the_new_banner_image_url',
            countFollowers: 0,
            creationDate: new Date(),
            description: 'the_new_shop_description',
            handle: 'the_new_shop_handle',
            id: 0,
            name: 'the_new_shop_name', // TODO To remove !!!!!
        });
        expect(result).toEqual({
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        });
    });

    test('rejects when it fails to save a shop', async () => {
        // Given
        const shopRepository = createMockOfShopRepository({
            persist: jest.fn().mockRejectedValue(new Error('persist-error')),
        });

        // When
        const createShop = createShopFactory(shopRepository);
        const ft = () =>
            createShop(mockOfCreateShopParams, mockOfAuthenticatedUser);

        // Then
        await expect(ft).rejects.toThrow('persist-error');
    });
});
