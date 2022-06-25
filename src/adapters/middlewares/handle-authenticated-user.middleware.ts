import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';

export const handleAuthenticatedUserMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        if (ctx.state.user) {
            ctx.authenticatedUser = ctx.state.user;
        } else {
            ctx.authenticatedUser = null;
        }

        logger.debug('added authenticated user to context');

        await next();
    };
};
