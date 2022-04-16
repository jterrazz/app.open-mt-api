import { Middleware } from 'koa';

export interface IMiddlewares {
    handleAuthenticatedUserMiddleware: Middleware;
    handleRequestErrorsMiddleware: Middleware;
    handleRequestTrackerMiddleware: Middleware;
    setResponseHeadersMiddleware: Middleware;
}
