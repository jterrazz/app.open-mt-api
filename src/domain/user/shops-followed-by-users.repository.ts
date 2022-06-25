import { ShopEntity } from '@domain/shop/shop.entity';

// TODO Move this to shop repository, doesn't make sense to put it here
export interface IShopsFollowedByUsersRepository {
    findByUserId: (userId: number) => Promise<Array<ShopEntity>>;
}
