import { getDependencies } from '@configuration/dependencies';

export const startApplication = async () => {
    const {
        logger,
        configuration: { ENVIRONMENT },
        database,
        webserver,
    } = getDependencies();

    logger.info(`app is starting with environment: ${ENVIRONMENT}`);

    try {
        await database.connect();
        await webserver.start();
    } catch (error) {
        logger.error(error);
    }
};

startApplication().then();
