import { IConfiguration, IDatabase, ILogger } from '@application/contracts';
import { PrismaClient } from '@prisma/client';
import { sleep } from '@application/utils/node/async';

export interface IPrismaDatabase extends IDatabase {
    client: PrismaClient;
}

const buildDatabaseClient = (logger: ILogger) => {
    const prismaClient = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'error',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
        ],
    });

    prismaClient.$on('query', (e) => {
        logger.debug(
            `query: ${e.query}, params: ${e.params}, duration: ${e.duration}, target: ${e.target}`,
        );
    });

    prismaClient.$on('info', (e) => {
        logger.info(`message: ${e.message}, target: ${e.target}`);
    });

    prismaClient.$on('warn', (e) => {
        logger.warn(`message: ${e.message}, target: ${e.target}`);
    });

    prismaClient.$on('error', (e) => {
        logger.error(`message: ${e.message}, target: ${e.target}`);
    });

    return prismaClient;
};

export const prismaDatabaseFactory = (
    {
        SERVICES: {
            DATABASE: { URL },
        },
    }: IConfiguration,
    logger: ILogger,
): IPrismaDatabase => {
    // Recreating this object would result in failure due to multiple Prisma clients
    // The global variable keeps one object for all unit tests
    if (global.prismaDatabase) {
        return global.prismaDatabase;
    }

    // Passing database URL to prisma
    process.env['DATABASE_URL'] = URL;

    const prismaClient = buildDatabaseClient(logger);
    const connect = async (remainingTries = 20) => {
        if (remainingTries <= 0) {
            return;
        }

        try {
            logger.info('connecting to database');
            await prismaClient.$connect();
            logger.debug('connected to database');
        } catch (e) {
            logger.error(
                'failed to connect to database, will try again in 500 ms',
            );
            await sleep(500);
            return connect(remainingTries - 1);
        }
    };
    const disconnect = async () => {
        logger.info('disconnecting database');
        await prismaClient.$disconnect();
        logger.debug('disconnected database');
    };

    global.prismaDatabase = {
        client: prismaClient,
        connect,
        disconnect,
    };

    return global.prismaDatabase;
};
