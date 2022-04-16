import { DuplicatedFieldError } from '@domain/error/technical/duplicated-field-error';
import { IShopRepository } from '@domain/shop/shop-repository';
import { ShopEntity } from '@domain/shop/shop-entity';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { UserEntity } from '@domain/user/user-entity';

export type CreateShopParams = Pick<
    ShopEntity,
    'name' | 'handle' | 'description' | 'bannerImageUrl'
>;
export type CreateShopResult = {
    // TODO Remove export
    handle: string;
    name: string;
};

export const createShopFactory = (shopRepository: IShopRepository) => {
    return async (
        newShopParams: CreateShopParams,
        authenticatedUser: UserEntity,
    ): Promise<CreateShopResult> => {
        const newShop: ShopEntity = {
            bannerImageUrl: newShopParams.bannerImageUrl || null,
            countFollowers: 0,
            creationDate: new Date(),
            description: newShopParams.description || null,
            handle: newShopParams.handle,
            id: 0, // TODO REMOVE !!!!!!!!!!!!!!!!
            name: newShopParams.name,
        };

        // TODO Test can't create a shop 2 times
        const persistedShop = await shopRepository
            .persist(newShop, authenticatedUser.id)
            .catch((error) => {
                // TODO Wrap in method
                if (
                    error instanceof DuplicatedFieldError &&
                    error.field === 'handle'
                ) {
                    throw new UnprocessableEntityError(['handle']);
                }
                throw error;
            });

        return {
            handle: persistedShop.handle,
            name: persistedShop.name,
        };
    };
};
