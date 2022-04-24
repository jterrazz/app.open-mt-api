import { BrokeOneToOneRelationError } from '@infrastructure/orm/prisma/map-prisma-error-to-domain';
import { DuplicatedFieldError } from '@domain/error/technical/duplicated-field-error';
import { ForbiddenError } from '@domain/error/client/forbidden-error';
import { IShopRepository } from '@domain/shop/shop-repository';
import { ShopEntity } from '@domain/shop/shop-entity';
import { UnprocessableEntityError } from '@domain/error/client/unprocessable-entity-error';
import { UserEntity } from '@domain/user/user-entity';

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
            .persist(newShop, authenticatedUser.id)
            .catch((error) => {
                console.log(error);
                // TODO Wrap in method
                if (
                    error instanceof DuplicatedFieldError &&
                    error.field === 'handle'
                ) {
                    throw new UnprocessableEntityError(['handle']);
                }

                if (error instanceof BrokeOneToOneRelationError) {
                    // TODO Test unit
                    throw new ForbiddenError('a user cannot create 2 shops');
                }
                throw error;
            });

        return {
            handle: persistedShop.handle,
            name: persistedShop.name,
        };
    };
};
