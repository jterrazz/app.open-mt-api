import { ShopEntity } from '@domain/shop/shop.entity';

export interface IShopRepository {
    persist: (
        persistShopParams: Pick<ShopEntity, 'description' | 'handle' | 'name'>,
        ownerUserId: number,
    ) => Promise<ShopEntity>;
    findByHandle: (handle: string) => Promise<ShopEntity | null>;
    findByOwnerId: (ownerId: number) => Promise<ShopEntity | null>;
    merge: (
        shop: Partial<Pick<ShopEntity, 'description' | 'name'>>,
        shopId: number,
    ) => Promise<ShopEntity>;
}
