import { createEndToEndApplication } from '../../../utils/create-end-to-end-application';
import {
    seedDatabaseWithUser,
    seedExampleOfValidPassword,
} from '@tests/seeds/seed-database-with-user';

const { requestAgent, database } = createEndToEndApplication();

beforeAll(async () => {
    await seedDatabaseWithUser(database.client, {
        email: 'login-email@test.com',
        hashedPassword: seedExampleOfValidPassword.hashedPassword,
    });
});

describe('END TO END - POST /authentication/login', () => {
    test('log in a user', async () => {
        // Given
        const body = {
            email: 'login-email@test.com',
            password: seedExampleOfValidPassword.password,
        };

        // When
        const response = await requestAgent
            .post('/authentication/login')
            .send(body);

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({});
        expect(response.headers['set-cookie'][0]).toMatch(
            /koa\.sess=[\w=]*; path=\/; httponly/,
        );
        expect(response.headers['set-cookie'][1]).toMatch(
            /koa\.sess\.sig=[\w\-_]*; path=\/; httponly/,
        );
    });

    test('rejects a bad password', async () => {
        // Given
        const body = {
            email: 'login-email@test.com',
            password: 'bad-password',
        };

        // When
        const response = await requestAgent
            .post('/authentication/login')
            .send(body);

        // Then
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({});
    });

    test('rejects an unknown email', async () => {
        // Given
        const body = {
            email: 'unknown-email@test.com',
            password: 'password',
        };

        // When
        const response = await requestAgent
            .post('/authentication/login')
            .send(body);

        // Then
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({});
    });
});
