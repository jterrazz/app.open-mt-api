import { getDependencies } from '@configuration/dependencies';
import {
    seedDatabaseWithUser,
    seedExampleOfValidPassword,
} from '@tests/seeds/seed-database-with-user';
import request from 'supertest';

export const createEndToEndApplication = () => {
    const { database, webserver } = getDependencies();
    const requestAgent = request.agent(webserver.app.callback());

    const createAuthenticatedRequestAgent = async () => {
        const seededUser = await seedDatabaseWithUser(database.client, {
            hashedPassword: seedExampleOfValidPassword.hashedPassword,
        });
        const authenticatedRequestAgent = await request.agent(
            webserver.app.callback(),
        );

        await authenticatedRequestAgent.post('/authentication/login').send({
            email: seededUser.email,
            password: seedExampleOfValidPassword.password,
        });

        return { authenticatedRequestAgent, seededUser };
    };

    return {
        app: webserver.app,
        createAuthenticatedRequestAgent,
        database,
        requestAgent,
    };
};
