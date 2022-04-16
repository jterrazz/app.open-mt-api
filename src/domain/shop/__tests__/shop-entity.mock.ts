import { ShopEntity } from '@domain/shop/shop-entity';

export const createMockOfShopEntity = (
    partialShopEntity: Partial<ShopEntity> = {},
): ShopEntity => ({
    bannerImageUrl: '',
    countFollowers: 42,
    creationDate: new Date('2020-01-01'),
    description: '',
    handle: '',
    id: 0,
    name: '',
    ...partialShopEntity,
});
