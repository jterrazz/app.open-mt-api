import { Middleware } from 'koa';
import { PassportStatic } from 'passport';
import { passportStrategyWithEmailPassword } from '@infrastructure/webserver/setup-passport-strategies';

export interface IMiddlewares {
    handleAuthenticatedUserMiddleware: Middleware;
    handleRequestErrorsMiddleware: Middleware;
    handleRequestTrackerMiddleware: Middleware;
    setResponseHeadersMiddleware: Middleware;
}
