import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';

export const handleAuthenticatedUserMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        if (ctx.state.user) {
            ctx.authenticatedUser = ctx.state.user; // TODO Test
        } else {
            ctx.authenticatedUser = null; // TODO Test
        }
        logger.debug('added authenticated user to context');
        await next();
    };
};
