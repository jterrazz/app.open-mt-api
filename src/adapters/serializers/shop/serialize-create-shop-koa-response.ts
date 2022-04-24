import { IKoaSerializer } from '@adapters/serializer';

export type SerializeCreateShopKoaResponse = IKoaSerializer<{
    handle: string;
    name: string;
}>;

export const serializeCreateShopKoaResponse: SerializeCreateShopKoaResponse = (
    ctx,
    response,
) => {
    ctx.body = {
        handle: response.handle,
        name: response.name,
    };
    ctx.status = 201;
};
