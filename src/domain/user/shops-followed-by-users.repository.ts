import { ShopEntity } from '@domain/shop/shop.entity';

export interface IShopsFollowedByUsersRepository {
    findByUserId: (userId: number) => Promise<Array<ShopEntity>>;
}
