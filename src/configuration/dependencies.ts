import { IConfiguration, ILogger, IWebServer } from '@application/contracts';
import { IControllers } from '@adapters/controller';
import { IMiddlewares } from '@adapters/middleware';
import {
    IPrismaDatabase,
    prismaDatabaseFactory,
} from '@infrastructure/orm/prisma/prisma-database';
import { ITrackerRepository } from '@domain/tracker/tracker-repository';
import { apiControllerFactory } from '@adapters/controllers/api-controller';
import { authenticateUserWithEmailFactory } from '@application/use-cases/authentication/authenticate-user-with-email';
import { checkBcryptPassword } from '@infrastructure/encryption/check-bcrypt-password';
import { configurationFactory } from '@configuration/configuration';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';
import { getShopFactory } from '@application/use-cases/shop/get-shop';
import { getUserPublicProfileFactory } from '@application/use-cases/user/get-user-public-profile';
import { handleAuthenticatedUserMiddlewareFactory } from '@adapters/middlewares/handle-authenticated-user';
import { handleRequestErrorsMiddlewareFactory } from '@adapters/middlewares/handle-request-errors';
import { handleRequestTrackerMiddlewareFactory } from '@adapters/middlewares/handle-request-tracker';
import { initTrackerForRequestFactory } from '@domain/tracker/init-tracker-for-request';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { modifyProductByIdFactory } from '@application/use-cases/product/modify-product-by-id';
import { passportDeserializer } from '@adapters/serializers/passport-deserializer';
import { passportSerializer } from '@adapters/serializers/passport-serializer';
import { passportStrategyLocalFactory } from '@adapters/middlewares/passport-strategy-local';
import { productControllerFactory } from '@adapters/controllers/product-controller';
import { productRepositoryPrismaFactory } from '@infrastructure/repositories/product-repository-prisma';
import { setResponseHeadersMiddlewareFactory } from '@adapters/middlewares/set-response-headers-middleware';
import { setupPassportStrategiesFactory } from '@infrastructure/webserver/setup-passport-strategies';
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

    // Domain

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

    const productRepository = productRepositoryPrismaFactory(
        prismaDatabase.client,
    );
    const shopRepository = shopRepositoryPrismaFactory(prismaDatabase.client);
    const userRepository = userRepositoryPrismaFactory(prismaDatabase.client);

    // Use cases

    const getApiState = getApiStateFactory(configuration);
    const modifyProductById = modifyProductByIdFactory(
        productRepository,
        shopRepository,
    );
    const createShop = createShopFactory(shopRepository);
    const getShop = getShopFactory(shopRepository);
    const getUserPublicProfile = getUserPublicProfileFactory(
        logger,
        userRepository,
    );
    const authenticateUserWithEmail = authenticateUserWithEmailFactory(
        logger,
        userRepository,
        checkBcryptPassword,
    );

    // Adapters - Controllers and middlewares

    const controllers: IControllers = {
        api: apiControllerFactory(getApiState),
        products: productControllerFactory(modifyProductById),
        shops: shopControllerFactory(createShop, getShop),
        users: userControllerFactory(getUserPublicProfile),
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

    const setupPassportStrategies = setupPassportStrategiesFactory(
        [passportStrategyLocalFactory(authenticateUserWithEmail)],
        passportSerializer,
        passportDeserializer,
    );

    // Web server

    const webserver = koaServerFactory(
        controllers,
        middlewares,
        logger,
        configuration,
        setupPassportStrategies,
    );

    return { configuration, database: prismaDatabase, logger, webserver };
};
