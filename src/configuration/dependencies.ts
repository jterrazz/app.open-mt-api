import { IAdapterControllers, IAdapterMiddlewares } from '@adapters/types';
import { IConfiguration, ILogger, IWebServer } from '@application/contracts';
import {
    IPrismaDatabase,
    prismaDatabaseFactory,
} from '@infrastructure/orm/prisma/prisma-database';
import { authenticateUserWithEmailFactory } from '@application/use-cases/authentication/authenticate-user-with-email';
import { checkBcryptPassword } from '@infrastructure/encryption/check-bcrypt-password';
import { configurationFactory } from '@configuration/configuration';
import { createProductControllerFactory } from '@adapters/controllers/product/create-product.controller';
import { createProductFactory } from '@application/use-cases/product/create-product';
import { createShopControllerFactory } from '@adapters/controllers/shop/create-shop.controller';
import { createShopFactory } from '@application/use-cases/shop/create-shop';
import { deserializeCreateProductKoaRequest } from '@adapters/serializers/routes/product/deserialize-create-product-koa-request';
import { deserializeCreateShopKoaRequest } from '@adapters/serializers/routes/shop/deserialize-create-shop-koa-request';
import { deserializeGetShopKoaRequest } from '@adapters/serializers/routes/shop/deserialize-get-shop-koa-request';
import { deserializeGetUserKoaRequest } from '@adapters/serializers/routes/user/deserialize-get-user-koa-request';
import { deserializeModifyProductKoaRequest } from '@adapters/serializers/routes/product/deserialize-modify-product-koa-request';
import { getApiStateControllerFactory } from '@adapters/controllers/api/get-api-state.controller';
import { getApiStateFactory } from '@application/use-cases/api/get-api-state';
import { getProductControllerFactory } from '@adapters/controllers/product/get-product.controller';
import { getShopControllerFactory } from '@adapters/controllers/shop/get-shop.controller';
import { getShopFactory } from '@application/use-cases/shop/get-shop';
import { getUserPublicProfileControllerFactory } from '@adapters/controllers/user/get-user-public-profile.controller';
import { getUserPublicProfileFactory } from '@application/use-cases/user/get-user-public-profile';
import { handleAuthenticatedUserMiddlewareFactory } from '@adapters/middlewares/handle-authenticated-user.middleware';
import { handleRequestErrorsMiddlewareFactory } from '@adapters/middlewares/handle-request-errors.middleware';
import { handleRequestTrackerMiddlewareFactory } from '@adapters/middlewares/handle-request-tracker.middleware';
import { initTrackerForRequestInMemoryFactory } from '@infrastructure/tracker/init-tracker-for-request.in-memory';
import { initTrackerForRequestMixpanelFactory } from '@infrastructure/tracker/init-tracker-for-request.mixpanel';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { localPassportStrategyFactory } from '@adapters/middlewares/passport/local.passport-strategy';
import { logInControllerFactory } from '@adapters/controllers/authentication/log-in.controller';
import { logOutControllerFactory } from '@adapters/controllers/authentication/log-out.controller';
import { modifyProductControllerFactory } from '@adapters/controllers/product/modify-product.controller';
import { modifyProductFactory } from '@application/use-cases/product/modify-product';
import { passportDeserializerFactory } from '@adapters/serializers/authentication/passport-deserializer';
import { passportSerializer } from '@adapters/serializers/authentication/passport-serializer';
import { productRepositoryPrismaFactory } from '@infrastructure/repositories/product.prisma-repository';
import { serializeCreateProductKoaResponse } from '@adapters/serializers/routes/product/serialize-create-product-koa-response';
import { serializeCreateShopKoaResponse } from '@adapters/serializers/routes/shop/serialize-create-shop-koa-response';
import { serializeGetApiStateKoaResponse } from '@adapters/serializers/routes/api/serialize-get-api-state-koa-response';
import { serializeGetShopKoaResponse } from '@adapters/serializers/routes/shop/serialize-get-shop-koa-response';
import { serializeGetUserKoaResponse } from '@adapters/serializers/routes/user/serialize-get-user-koa-response';
import { serializeLoginKoaResponse } from '@adapters/serializers/routes/authentication/serialize-login-koa-response';
import { serializeLogoutKoaResponse } from '@adapters/serializers/routes/authentication/serialize-logout-koa-response';
import { serializeModifyProductKoaResponse } from '@adapters/serializers/routes/product/serialize-modify-product-koa-response';
import { setResponseHeadersMiddlewareFactory } from '@adapters/middlewares/set-response-headers.middleware';
import { setupPassportStrategiesFactory } from '@infrastructure/webserver/setup-passport-strategies';
import { shopRepositoryPrismaFactory } from '@infrastructure/repositories/shop.prisma-repository';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user.prisma-repository';
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

    const initTrackerFactory = [
        initTrackerForRequestMixpanelFactory,
        initTrackerForRequestInMemoryFactory,
    ].find(({ isApplicable }) => isApplicable(configuration.ENVIRONMENT));

    if (!initTrackerFactory) {
        throw new Error(
            `a tracker repository was not found for environment ${configuration.ENVIRONMENT}`,
        );
    }

    const initTracker = initTrackerFactory.factory(configuration);

    const productRepository = productRepositoryPrismaFactory(
        prismaDatabase.client,
    );
    const shopRepository = shopRepositoryPrismaFactory(prismaDatabase.client);
    const userRepository = userRepositoryPrismaFactory(prismaDatabase.client);

    // Use cases

    const getApiState = getApiStateFactory(configuration);
    const createShop = createShopFactory(shopRepository);
    const getShop = getShopFactory(shopRepository);
    const createProduct = createProductFactory(productRepository);
    const modifyProductById = modifyProductFactory(
        productRepository,
        shopRepository,
    );
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

    const controllers: IAdapterControllers = {
        api: {
            getState: getApiStateControllerFactory(
                getApiState,
                serializeGetApiStateKoaResponse,
            ),
        },
        authentication: {
            logIn: logInControllerFactory(serializeLoginKoaResponse),
            logOut: logOutControllerFactory(serializeLogoutKoaResponse),
        },
        products: {
            createProduct: createProductControllerFactory(
                createProduct,
                shopRepository,
                deserializeCreateProductKoaRequest,
                serializeCreateProductKoaResponse,
            ),
            getProduct: getProductControllerFactory(),
            modifyProduct: modifyProductControllerFactory(
                modifyProductById,
                deserializeModifyProductKoaRequest,
                serializeModifyProductKoaResponse,
            ),
        },
        shops: {
            createShop: createShopControllerFactory(
                createShop,
                deserializeCreateShopKoaRequest,
                serializeCreateShopKoaResponse,
            ),
            getShop: getShopControllerFactory(
                getShop,
                deserializeGetShopKoaRequest,
                serializeGetShopKoaResponse,
            ),
        },
        users: {
            getPrivateSettings: getUserPublicProfileControllerFactory(
                getUserPublicProfile,
                deserializeGetUserKoaRequest,
                serializeGetUserKoaResponse,
            ), // TODO Replace bad controller
            getPublicProfile: getUserPublicProfileControllerFactory(
                getUserPublicProfile,
                deserializeGetUserKoaRequest,
                serializeGetUserKoaResponse,
            ),
        },
    };

    const middlewares: IAdapterMiddlewares = {
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
        [localPassportStrategyFactory(authenticateUserWithEmail)],
        passportSerializer,
        passportDeserializerFactory(userRepository),
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
