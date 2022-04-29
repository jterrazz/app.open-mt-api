import { IKoaContext } from '@adapters/controllers/koa-controller';
import { InitTrackerForRequest } from '@domain/tracker/init-tracker-for-request';
import { Middleware } from 'koa';

export const handleRequestTrackerMiddlewareFactory = (
    initTrackerForRequest: InitTrackerForRequest,
): Middleware => {
    return async (ctx: IKoaContext, next) => {
        ctx.requestTracker = initTrackerForRequest(ctx.authenticatedUser?.id);
        await next();
        ctx.requestTracker.stop();
    };
};
