import { IShopRepository } from '@domain/shop/shop.repository';
import { ShopEntity } from '@domain/shop/shop.entity';
import { UserEntity } from '@domain/user/user.entity';

export type GetUserListOfFollowedShops = (
    user: UserEntity,
) => Promise<ShopEntity[]>;

// TODO Paging
export const getUserListOfFollowedShopsFactory = (
    shopRepository: IShopRepository,
): GetUserListOfFollowedShops => {
    return (user: UserEntity) => {
        return shopRepository.findManyByFollowerUserId(user.id);
    };
};
