import { dangerouslyDropAllDatabaseRows } from '@infrastructure/orm/prisma/dangerously-drop-all-database-rows';
import { getDependencies } from '@configuration/dependencies';

module.exports = async () => {
    const { database, logger } = getDependencies();

    logger.info('ending all tests');
    logger.info('will drop all database data and disconnect');

    await dangerouslyDropAllDatabaseRows(database.client);
    await database.disconnect();
};
