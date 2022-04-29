import * as z from 'zod';
import { IKoaDeserializer } from '@adapters/serializers/routes/koa-serializer';
import { Z_SHOP_HANDLE, Z_SHOP_NAME } from '@domain/shop/shop-entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export type DeserializeCreateShopKoaRequest = IKoaDeserializer<{
    handle: string;
    name: string;
}>;

export const deserializeCreateShopKoaRequest: DeserializeCreateShopKoaRequest =
    (ctx) => {
        return zodErrorToUnprocessableEntityErrorWrapper(() =>
            z
                .object({
                    handle: Z_SHOP_HANDLE,
                    name: Z_SHOP_NAME,
                })
                .parse(ctx.request.body),
        );
    };
