import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import session from 'koa-session';

import { IConfiguration, ILogger, IWebServer } from '@application/contracts';
import { IControllers } from '@adapters/controller';
import { IMiddlewares } from '@adapters/middleware';
import { routerFactory } from '@infrastructure/webserver/router';

export const koaServerFactory = (
    controllers: IControllers,
    middlewares: IMiddlewares,
    logger: ILogger,
    configuration: IConfiguration,
    setupPassportStrategies: () => void,
): IWebServer => {
    const app = new Koa();

    setupPassportStrategies();

    // Middlewares - Errors
    app.use(middlewares.handleRequestErrorsMiddleware);
    // Middlewares - Authentication
    app.keys = [configuration.CLIENT_SESSION.SECRET];
    app.use(session({}, app)); // TODO Add redis session
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(middlewares.handleAuthenticatedUserMiddleware);
    // Middlewares - Requests
    app.use(bodyParser());
    app.use(middlewares.setResponseHeadersMiddleware);
    app.use(middlewares.handleRequestTrackerMiddleware);

    // Router

    const router = routerFactory(controllers);
    app.use(router.routes()).use(router.allowedMethods());

    return {
        app,
        start: () =>
            app.listen(configuration.API.PORT, () => {
                logger.info(
                    `app is listening on port: ${configuration.API.PORT}`,
                );
            }),
    };
};
