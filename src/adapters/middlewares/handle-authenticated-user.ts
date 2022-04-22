import { ILogger } from '@application/contracts';
import { Middleware } from 'koa';
import { createMockOfUser } from '@domain/user/__tests__/user-entity.mock';

export const handleAuthenticatedUserMiddlewareFactory = (
    logger: ILogger,
): Middleware => {
    return async (ctx, next) => {
        if (ctx.headers.authorization) {
            ctx.authenticatedUser = createMockOfUser(); // TODO Test
        } else {
            ctx.authenticatedUser = null; // TODO Test
        }
        logger.debug('added authenticated user to context');
        await next();
    };
};
