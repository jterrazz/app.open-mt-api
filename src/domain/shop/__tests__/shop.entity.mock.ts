import { ShopEntity } from '@domain/shop/shop.entity';

export const createMockOfShopEntity = (
    partialShopEntity: Partial<ShopEntity> = {},
): ShopEntity => ({
    bannerImageUrl: 'the_banner_image_url',
    countFollowers: 42,
    creationDate: new Date('2020-01-01'),
    description: 'the_description',
    handle: 'the_handle',
    id: 0,
    name: 'the_name',
    ...partialShopEntity,
});
