import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import { IWebServer } from '@application/contracts';
import { initDependencies } from '@configuration/dependencies';

export type CreateEndToEndApplication = {
    app: IWebServer['app'];
    database: IPrismaDatabase;
};

export const createEndToEndApplication = (): CreateEndToEndApplication => {
    const { database, webserver } = initDependencies();

    return {
        app: webserver.app,
        database,
    };
};
