import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { IInitiatedKoaController } from '@adapters/controllers';
import { IShopRepository } from '@domain/shop/shop-repository';
import { NotFoundError } from '@domain/error/client/not-found-error';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import {
    deserializeCreateShopKoaRequest,
    serializeCreateShopKoaResponse,
} from '@adapters/serializers/shop/create-shop-koa-serializer';
import {
    deserializeGetShopKoaRequest,
    serializeGetShopKoaResponse,
} from '@adapters/serializers/shop/get-shop-koa-serializer';
import { getShopFactory } from '@application/use-cases/shop/get-shop';

export const shopControllerFactory = (shopRepository: IShopRepository) => {
    const createShop: IInitiatedKoaController = async (ctx) => {
        const { handle, name } = deserializeCreateShopKoaRequest(ctx);
        const description = ''; // TODO To get from request
        const createNewShop = createShopFactory(shopRepository); // TODO Move up

        if (!ctx.authenticatedUser) {
            throw new AuthenticationRequiredError(); // TODO To test
        }

        const savedShop = await createNewShop(
            {
                bannerImageUrl: null,
                // TODO To fix with uploaded image
                description,

                handle,
                name,
            },
            ctx.authenticatedUser,
        );

        serializeCreateShopKoaResponse(ctx, {
            handle: savedShop.handle,
            name: savedShop.name,
        });
    };

    const getShop: IInitiatedKoaController = async (ctx) => {
        const { shopHandle } = deserializeGetShopKoaRequest(ctx);
        const getShop = getShopFactory(shopRepository); // TODO Move up

        const shopEntity = await getShop(shopHandle);

        if (!shopEntity) {
            throw new NotFoundError(`shop '${shopHandle}' does not exist`);
        }

        serializeGetShopKoaResponse(ctx, {
            description: shopEntity.description,
            handle: shopEntity.handle,
            name: shopEntity.name,
        });
    };

    return { createShop, getShop };
};
