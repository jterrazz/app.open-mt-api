import { AuthenticationRequiredError } from '@domain/error/client/authentication-required-error';
import { CreateShop } from '@application/use-cases/shop/create-shop';
import { GetShop } from '@application/use-cases/shop/get-shop';
import { IInitiatedKoaController } from '@adapters/controller';
import { NotFoundError } from '@domain/error/client/not-found-error';
import {
    deserializeCreateShopKoaRequest,
    serializeCreateShopKoaResponse,
} from '@adapters/serializers/shop/create-shop-koa-serializer';
import {
    deserializeGetShopKoaRequest,
    serializeGetShopKoaResponse,
} from '@adapters/serializers/shop/get-shop-koa-serializer';

export const shopControllerFactory = (
    createShop: CreateShop,
    getShop: GetShop,
) => {
    const createShopController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedCreateShop();

        const { handle, name } = deserializeCreateShopKoaRequest(ctx);
        const description = ''; // TODO To get from request

        if (!ctx.authenticatedUser) {
            throw new AuthenticationRequiredError();
        }

        const savedShop = await createShop(
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

    const getShopController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedGetShop();

        const { shopHandle } = deserializeGetShopKoaRequest(ctx);

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

    return { createShop: createShopController, getShop: getShopController };
};
