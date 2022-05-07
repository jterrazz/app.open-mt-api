import { DeserializeGetShopKoaRequest } from '@adapters/serializers/routes/shop/deserialize-get-shop-koa-request';
import { GetShop } from '@application/use-cases/shop/get-shop';
import { IInitiatedKoaController } from '@adapters/controllers/koa-controller';
import { NotFoundClientError } from '@domain/error/client/not-found-client-error';
import { SerializeGetShopKoaResponse } from '@adapters/serializers/routes/shop/serialize-get-shop-koa-response';

export const getShopControllerFactory = (
    getShop: GetShop,
    deserializeGetShopKoaRequest: DeserializeGetShopKoaRequest,
    serializeGetShopKoaResponse: SerializeGetShopKoaResponse,
): IInitiatedKoaController => {
    return async (ctx) => {
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
};
