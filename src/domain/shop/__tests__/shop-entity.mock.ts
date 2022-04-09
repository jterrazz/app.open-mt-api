import { IShopEntity } from '@domain/shop/shop-entity';

export const createMockOfShopEntity = (): IShopEntity => ({
    bannerImageUrl: '',
    countFollowers: 42,
    creationDate: new Date('2020-01-01'),
    description: '',
    handle: '',
    name: '',
});
