import { IShopRepository } from '@domain/shop/shop-repository';
import { createMockOfShopEntity } from '@domain/shop/__tests__/shop-entity.mock';

export const createMockOfShopRepository = (
    partialShopRepository: Partial<IShopRepository> = {},
): IShopRepository => ({
    findByHandle: jest.fn().mockResolvedValue(createMockOfShopEntity()),
    findByOwnerId: jest.fn().mockResolvedValue(createMockOfShopEntity()),
    merge: jest.fn().mockImplementation(async (input) => input),
    persist: jest.fn().mockImplementation(async (input) => input),
    ...partialShopRepository,
});
