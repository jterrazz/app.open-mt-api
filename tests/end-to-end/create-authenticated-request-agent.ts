import { EndToEndApplication } from '@tests/end-to-end/create-end-to-end-application';
import { IPrismaDatabase } from '@infrastructure/orm/prisma/prisma-database';
import {
    seedDatabaseWithUser,
    seedExampleOfValidPassword,
} from '@tests/seeds/user';
import request from 'supertest';

export const createAuthenticatedRequestAgent = async (
    databaseClient: IPrismaDatabase['client'],
    endToEndApplication: EndToEndApplication,
) => {
    const seededUser = await seedDatabaseWithUser(databaseClient, {
        hashedPassword: seedExampleOfValidPassword.hashedPassword,
    });
    const authenticatedRequestAgent = await request.agent(
        endToEndApplication.app.callback(),
    );

    await authenticatedRequestAgent.post('/auth/login').send({
        email: seededUser.email,
        password: seedExampleOfValidPassword.password,
    });

    return authenticatedRequestAgent;
};
