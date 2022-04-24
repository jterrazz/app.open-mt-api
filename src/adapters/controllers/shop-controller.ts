import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { CreateShop } from '@application/use-cases/shop/create-shop';
import { DeserializeCreateShopKoaRequest } from '@adapters/serializers/shop/deserialize-create-shop-koa-request';
import { DeserializeGetShopKoaRequest } from '@adapters/serializers/shop/deserialize-get-shop-koa-request';
import { GetShop } from '@application/use-cases/shop/get-shop';
import { IInitiatedKoaController } from '@adapters/controller';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { SerializeCreateShopKoaResponse } from '@adapters/serializers/shop/serialize-create-shop-koa-response';
import { SerializeGetShopKoaResponse } from '@adapters/serializers/shop/serialize-get-shop-koa-response';

export const shopControllerFactory = (
    createShop: CreateShop,
    getShop: GetShop,
    deserializeCreateShopKoaRequest: DeserializeCreateShopKoaRequest,
    deserializeGetShopKoaRequest: DeserializeGetShopKoaRequest,
    serializeCreateShopKoaResponse: SerializeCreateShopKoaResponse,
    serializeGetShopKoaResponse: SerializeGetShopKoaResponse,
) => {
    const createShopController: IInitiatedKoaController = async (ctx) => {
        ctx.requestTracker.requestedCreateShop();

        const { handle, name } = deserializeCreateShopKoaRequest(ctx);
        const description = ''; // TODO To get from request

        if (!ctx.authenticatedUser) {
            throw new AuthenticationRequiredClientError();
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
            throw new NotFoundClientError(
                `shop '${shopHandle}' does not exist`,
            );
        }

        serializeGetShopKoaResponse(ctx, {
            description: shopEntity.description,
            handle: shopEntity.handle,
            name: shopEntity.name,
        });
    };

    return { createShop: createShopController, getShop: getShopController };
};
