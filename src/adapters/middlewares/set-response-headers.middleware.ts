import { IConfiguration } from '@application/contracts';
import { Middleware } from 'koa';

export const setResponseHeadersMiddlewareFactory = (
    configuration: IConfiguration,
): Middleware => {
    return async (ctx, next) => {
        ctx.set('Api-Version', configuration.API.VERSION);

        await next();
    };
};
