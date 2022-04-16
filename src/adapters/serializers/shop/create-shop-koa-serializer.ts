import * as z from 'zod';
import {
    IKoaDeserializer,
    IKoaSerializer,
} from '@adapters/serializers/koa-serializer';
import { Z_SHOP_HANDLE, Z_SHOP_NAME } from '@domain/shop/shop-entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export const deserializeCreateShopKoaRequest: IKoaDeserializer<{
    handle: string;
    name: string;
}> = (ctx) => {
    return zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                handle: Z_SHOP_HANDLE,
                name: Z_SHOP_NAME,
            })
            .parse(ctx.request.body),
    );
};

export const serializeCreateShopKoaResponse: IKoaSerializer<{
    handle: string;
    name: string;
}> = (ctx, response) => {
    ctx.body = {
        handle: response.handle,
        name: response.name,
    };
};
