import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';

export const handleAuthenticatedUserMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        ctx.authenticatedUser = null; // TODO Test null for no user and object for authenticated guys
        logger.debug('added authenticated user to context');
        await next();
    };
};
