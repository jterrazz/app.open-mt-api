import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { IWebServer } from '@application/contracts';
import { initDependencies } from '@configuration/dependencies';

export type EndToEndApplication = {
    app: IWebServer['app'];
    database: IPrismaDatabase;
};

export const createEndToEndApplication = (): EndToEndApplication => {
    const { database, webserver } = initDependencies();

    return {
        app: webserver.app,
        database,
    };
};
