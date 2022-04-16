import { IConfiguration, ILogger, IWebServer } from '@application/contracts';
import { IControllers } from '@adapters/controllers';
import { IMiddlewares } from '@adapters/middlewares';
import {
    IPrismaDatabase,
    prismaDatabaseFactory,
} from '@infrastructure/orm/prisma/prisma-database';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { apiControllerFactory } from '@adapters/controllers/api-controller';
import { configurationFactory } from '@configuration/configuration';
import { handleAuthenticatedUserMiddlewareFactory } from '@adapters/middlewares/handle-authenticated-user';
import { handleRequestErrorsMiddlewareFactory } from '@adapters/middlewares/handle-request-errors';
import { handleRequestTrackerMiddlewareFactory } from '@adapters/middlewares/handle-request-tracker';
import { initTrackerForRequestFactory } from '@domain/tracker/init-tracker-for-request';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { paymentRepositoryPrismaFactory } from '@infrastructure/repositories/payment-repository-prisma';
import { productControllerFactory } from '@adapters/controllers/product-controller';
import { productRepositoryPrismaFactory } from '@infrastructure/repositories/product-repository-prisma';
import { setResponseHeadersMiddlewareFactory } from '@adapters/middlewares/set-response-headers-middleware';
import { shopControllerFactory } from '@adapters/controllers/shop-controller';
import { shopRepositoryPrismaFactory } from '@infrastructure/repositories/shop-repository-prisma';
import { trackerRepositoryInMemoryFactory } from '@infrastructure/repositories/tracker-repository-in-memory';
import { trackerRepositoryMixpanelFactory } from '@infrastructure/repositories/tracker-repository-mixpanel';
import { userControllerFactory } from '@adapters/controllers/user-controller';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';
import { winstonLoggerFactory } from '@infrastructure/logger/winston/winston-logger';

export const initDependencies = (): {
    webserver: IWebServer;
    logger: ILogger;
    database: IPrismaDatabase;
    configuration: IConfiguration;
} => {
    const configuration = configurationFactory();
    const logger = winstonLoggerFactory(configuration);
    const prismaDatabase = prismaDatabaseFactory(configuration, logger);

    // Dependencies

    const trackerRepository: ITrackerRepository | undefined = [
        trackerRepositoryMixpanelFactory(),
        trackerRepositoryInMemoryFactory(),
    ].find((strategy) => strategy.isApplicable(configuration.ENVIRONMENT));

    if (!trackerRepository) {
        throw new Error(
            `a tracker repository was not found for environment ${configuration.ENVIRONMENT}`,
        );
    }

    const initTracker = initTrackerForRequestFactory(trackerRepository);

    const paymentRepository = paymentRepositoryPrismaFactory(
        prismaDatabase.client,
    );
    const productRepository = productRepositoryPrismaFactory(
        prismaDatabase.client,
    );
    const shopRepository = shopRepositoryPrismaFactory(prismaDatabase.client);
    const userRepository = userRepositoryPrismaFactory(prismaDatabase.client);

    // Adapters - Controllers and middlewares

    const controllers: IControllers = {
        api: apiControllerFactory(configuration),
        products: productControllerFactory(productRepository, shopRepository),
        shops: shopControllerFactory(shopRepository),
        users: userControllerFactory(logger, userRepository),
    };

    const middlewares: IMiddlewares = {
        handleAuthenticatedUserMiddleware:
            handleAuthenticatedUserMiddlewareFactory(logger),
        handleRequestErrorsMiddleware:
            handleRequestErrorsMiddlewareFactory(logger),
        handleRequestTrackerMiddleware:
            handleRequestTrackerMiddlewareFactory(initTracker),
        setResponseHeadersMiddleware:
            setResponseHeadersMiddlewareFactory(configuration),
    };

    // Web server

    const webserver = koaServerFactory(
        controllers,
        middlewares,
        logger,
        configuration,
    );

    return { configuration, database: prismaDatabase, logger, webserver };
};
