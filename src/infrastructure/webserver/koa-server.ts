import { IConfiguration, ILogger, IWebServer } from '@application/contracts';
import { IControllers } from '@adapters/controllers';
import { IMiddlewares } from '@adapters/middlewares';
import { routerFactory } from '@infrastructure/webserver/routes';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

export const koaServerFactory = (
    controllers: IControllers,
    middlewares: IMiddlewares,
    logger: ILogger,
    configuration: IConfiguration,
): IWebServer => {
    const app = new Koa();

    // Middlewares

    app.use(bodyParser());
    app.use(middlewares.handleRequestErrorsMiddleware);
    app.use(middlewares.setResponseHeadersMiddleware);
    app.use(middlewares.handleRequestTrackerMiddleware);
    app.use(middlewares.handleAuthenticatedUserMiddleware);

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
