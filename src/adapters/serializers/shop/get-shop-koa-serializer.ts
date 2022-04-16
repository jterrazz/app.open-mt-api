import * as z from 'zod';
import {
    IKoaDeserializer,
    IKoaSerializer,
} from '@adapters/serializers/koa-serializer';
import { Z_SHOP_HANDLE } from '@domain/shop/shop-entity';
import { zodErrorToUnprocessableEntityErrorWrapper } from '@application/utils/zod/zod-error-to-unprocessable-entity-error-wrapper';

export const deserializeGetShopKoaRequest: IKoaDeserializer<{
    shopHandle: string;
}> = (ctx) => {
    return zodErrorToUnprocessableEntityErrorWrapper(() =>
        z
            .object({
                shopHandle: Z_SHOP_HANDLE,
            })
            .parse(ctx.params),
    );
};

export const serializeGetShopKoaResponse: IKoaSerializer<{
    description: string | null;
    handle: string;
    name: string;
}> = (ctx, response) => {
    ctx.body = {
        description: response.description,
        handle: response.handle,
        name: response.name,
    };
};
