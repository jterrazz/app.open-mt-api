import { IKoaSerializer } from '@adapters/serializer';

export const serializeGetApiStateResponse: IKoaSerializer<{
    env: string;
    state: string;
    time: Date;
    version: string;
}> = (ctx, props) => {
    ctx.body = {
        ...props,
        time: props.time.toISOString(),
    };
};
