import { ShopEntity } from '@domain/shop/shop.entity';

export interface IShopRepository {
    add: (
        persistShopParams: Pick<ShopEntity, 'description' | 'handle' | 'name'>,
        ownerUserId: number,
    ) => Promise<ShopEntity>;
    findByHandle: (handle: string) => Promise<ShopEntity | null>;
    findByOwnerId: (ownerId: number) => Promise<ShopEntity | null>;
    findManyByFollowerUserId: (followerId: number) => Promise<ShopEntity[]>;
    update: (
        shop: Partial<Pick<ShopEntity, 'description' | 'name'>>,
        shopId: number,
    ) => Promise<ShopEntity>;
}
