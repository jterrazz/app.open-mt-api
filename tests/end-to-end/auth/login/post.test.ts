import { createEndToEndApplication } from '../../create-end-to-end-application';
import { initDependencies } from '@configuration/dependencies';
import {
    seedDatabaseWithUser,
    seedExampleOfValidPassword,
} from '@tests/seeds/user';
import request from 'supertest';

const endToEndApplication = createEndToEndApplication();
const databaseClient = initDependencies().database.client;

beforeAll(async () => {
    await seedDatabaseWithUser(databaseClient, {
        email: 'login-email@test.com',
        hashedPassword: seedExampleOfValidPassword.hashedPassword,
    });
});

describe('END TO END - POST /auth/login', () => {
    test('log in a user', async () => {
        // Given
        const body = {
            email: 'login-email@test.com',
            password: seedExampleOfValidPassword.password,
        };

        // When
        const response = await request(endToEndApplication.app.callback())
            .post('/auth/login')
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
        const response = await request(endToEndApplication.app.callback())
            .post('/auth/login')
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
        const response = await request(endToEndApplication.app.callback())
            .post('/auth/login')
            .send(body);

        // Then
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({});
    });
});
