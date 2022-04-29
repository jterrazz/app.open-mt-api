import { IKoaSerializer } from '@adapters/serializers/routes/koa-serializer';

export type SerializeGetApiStateKoaResponse = IKoaSerializer<{
    env: string;
    state: string;
    time: Date;
    version: string;
}>;

export const serializeGetApiStateKoaResponse: SerializeGetApiStateKoaResponse =
    (ctx, props) => {
        ctx.body = {
            ...props,
            time: props.time.toISOString(),
        };
    };
