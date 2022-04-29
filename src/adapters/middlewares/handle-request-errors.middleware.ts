import { ClientError } from '@domain/error/client/client-error';
import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';

export const handleRequestErrorsMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            if (error instanceof ClientError) {
                ctx.response.status = error.httpCode;
                ctx.response.body = {
                    message: error.publicMessage,
                    meta: error.publicMeta,
                };
            } else {
                logger.error(`unknown error ${error}`);

                ctx.response.status = 500;
                ctx.response.body = {
                    message: 'Internal Server Error',
                };
            }
        }
    };
};
