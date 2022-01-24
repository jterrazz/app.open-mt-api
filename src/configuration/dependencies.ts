import { IControllers } from '@adapters/controllers/controllers';
import { IDependencies, IWebServer } from '@application/contracts';
import { apiControllerFactory } from '@adapters/controllers/api.controller';
import { configurationFactory } from '@configuration/configuration';
import { koaServerFactory } from '@infrastructure/webserver/koa-server';
import { mixpanelTrackerFactoryStrategy } from '@infrastructure/tracker/tracker-mixpanel';
import { paymentRepositoryPrismaFactory } from '@infrastructure/repositories/payment-repository-prisma';
import { prismaDatabaseFactory } from '@infrastructure/orm/prisma/prisma-database';
import { productRepositoryPrisma } from '@infrastructure/repositories/product-repository-prisma';
import { shopControllerFactory } from '@adapters/controllers/shop.controller';
import { shopRepositoryPrismaFactory } from '@infrastructure/repositories/shop-repository-prisma';
import { trackerInMemoryFactory } from '@infrastructure/tracker/tracker-in-memory';
import { userControllerFactory } from '@adapters/controllers/user.controller';
import { userRepositoryPrismaFactory } from '@infrastructure/repositories/user-repository-prisma';
import { winstonLoggerFactory } from '@infrastructure/logger/winston/winston-logger';

export const getDependencies = (): {
    webserver: IWebServer;
} & IDependencies => {
    const configuration = configurationFactory();
    const logger = winstonLoggerFactory(configuration);
    const database = prismaDatabaseFactory(configuration, logger);

    // Dependencies

    const trackerFactory = [
        mixpanelTrackerFactoryStrategy,
        trackerInMemoryFactory,
    ].find((strategy) => strategy.isApplicable(configuration.ENVIRONMENT));

    if (!trackerFactory) {
        throw new Error('a tracker dependency was not found');
    }

    const dependencies: IDependencies = {
        configuration,
        database,
        logger,
        repositories: {
            paymentRepository: paymentRepositoryPrismaFactory(database),
            productRepository: productRepositoryPrisma(database),
            shopRepository: shopRepositoryPrismaFactory(database),
            userRepository: userRepositoryPrismaFactory(database),
        },
        trackerFactory,
    };

    // Controllers

    const controllers: IControllers = {
        api: apiControllerFactory(dependencies),
        shops: shopControllerFactory(dependencies),
        users: userControllerFactory(dependencies),
    };

    // Web server

    const webserver = koaServerFactory(dependencies, controllers);

    return { ...dependencies, webserver };
};