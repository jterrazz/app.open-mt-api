import { BrokenOneToOneRelationServerError } from '@domain/error/server/broken-one-to-one-relation-server-error';
import { DuplicatedFieldServerError } from '@domain/error/server/duplicated-field-server-error';
import { ForbiddenClientError } from '@domain/error/client/forbidden-client-error';
import { IShopRepository } from '@domain/shop/shop.repository';
import { ShopEntity } from '@domain/shop/shop.entity';
import { UnprocessableEntityClientError } from '@domain/error/client/unprocessable-entity-client-error';
import { UserEntity } from '@domain/user/user.entity';

export type CreateShop = (
    newShopParams: Pick<
        ShopEntity,
        'name' | 'handle' | 'description' | 'bannerImageUrl'
    >,
    authenticatedUser: UserEntity,
) => Promise<{
    handle: string;
    name: string;
}>;

export const createShopFactory = (
    shopRepository: IShopRepository,
): CreateShop => {
    return async (newShopParams, authenticatedUser) => {
        const newShop: ShopEntity = {
            bannerImageUrl: newShopParams.bannerImageUrl || null,
            countFollowers: 0,
            creationDate: new Date(),
            description: newShopParams.description || null,
            handle: newShopParams.handle,
            id: 0, // TODO REMOVE !!!!!!!!!!!!!!!!
            name: newShopParams.name,
        };

        const persistedShop = await shopRepository
            .add(newShop, authenticatedUser.id)
            .catch((error) => {
                console.log(error);
                // TODO Wrap in method
                if (
                    error instanceof DuplicatedFieldServerError &&
                    error.field === 'handle'
                ) {
                    throw new UnprocessableEntityClientError(['handle']);
                }

                if (error instanceof BrokenOneToOneRelationServerError) {
                    // TODO Test unit
                    throw new ForbiddenClientError(
                        'a user cannot create 2 shops',
                    );
                }
                throw error;
            });

        return {
            handle: persistedShop.handle,
            name: persistedShop.name,
        };
    };
};
