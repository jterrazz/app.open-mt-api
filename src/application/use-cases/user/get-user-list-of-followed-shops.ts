import { IShopRepository } from '@domain/shop/shop.repository';
import { UserEntity } from '@domain/user/user.entity';

// TODO Paging
export const getUserListOfFollowedShopsFactory = (
    shopRepository: IShopRepository,
) => {
    return (authenticatedUser: UserEntity) => {
        return shopRepository.findManyByFollowerUserId(authenticatedUser.id);
    };
};
