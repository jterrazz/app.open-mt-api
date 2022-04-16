import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { Middleware } from 'koa';

export const handleRequestTrackerMiddlewareFactory = (
    initTrackerForRequest: (userId?: string) => ITrackerRepository,
): Middleware => {
    return async (ctx, next) => {
        ctx.requestTracker = initTrackerForRequest(); // FIXME add userId
        await next();
        ctx.requestTracker.stop();
    };
};
