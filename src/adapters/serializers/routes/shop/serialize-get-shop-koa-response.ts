import { IKoaSerializer } from '@adapters/serializers/routes/koa-serializer';

export type SerializeGetShopKoaResponse = IKoaSerializer<{
    description: string | null;
    handle: string;
    name: string;
}>;

export const serializeGetShopKoaResponse: SerializeGetShopKoaResponse = (
    ctx,
    response,
) => {
    ctx.body = {
        description: response.description,
        handle: response.handle,
        name: response.name,
    };
};
