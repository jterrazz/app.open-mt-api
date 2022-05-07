import { AuthenticationRequiredClientError } from '@domain/error/client/authentication-required-client-error';
import { CreateShop } from '@application/use-cases/shop/create-shop';
import { DeserializeCreateShopKoaRequest } from '@adapters/serializers/routes/shop/deserialize-create-shop-koa-request';
import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { SerializeCreateShopKoaResponse } from '@adapters/serializers/routes/shop/serialize-create-shop-koa-response';

export const createShopControllerFactory = (
    createShop: CreateShop,
    deserializeCreateShopKoaRequest: DeserializeCreateShopKoaRequest,
    serializeCreateShopKoaResponse: SerializeCreateShopKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
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
};
