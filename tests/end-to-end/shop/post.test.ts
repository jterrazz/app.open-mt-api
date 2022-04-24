import { createAuthenticatedRequestAgent } from '@tests/end-to-end/create-authenticated-request-agent';
import { createEndToEndApplication } from '@tests/end-to-end/create-end-to-end-application';
import { initDependencies } from '@configuration/dependencies';
import { seedDatabaseWithShop } from '@tests/seeds/shop';
import request from 'supertest';

const endToEndApplication = createEndToEndApplication();
const databaseClient = initDependencies().database.client;

describe('END TO END - POST /shop', function () {
    test('creates a new shop', async () => {
        // Given
        const authenticatedRequestAgent = await createAuthenticatedRequestAgent(
            databaseClient,
            endToEndApplication,
        );
        const params = {
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        };

        // When
        const response = await authenticatedRequestAgent
            .post('/shop')
            .send(params);

        // Then
        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        });
        expect(response.headers['content-type']).toContain('json');
    });

    test('does not create a new shop if user is not authenticated', async () => {
        // Given
        const params = {
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        };

        // When
        const response = await request(endToEndApplication.app.callback())
            .post('/shop')
            .send(params);

        // Then
        expect(response.status).toEqual(403);
    });

    test('does not create a shop with an handle already existing', async () => {
        // Given
        const { shop: seededShop } = await seedDatabaseWithShop(databaseClient);
        const authenticatedRequestAgent = await createAuthenticatedRequestAgent(
            databaseClient,
            endToEndApplication,
        );
        const params = {
            handle: seededShop.handle,
            name: 'the_duplicated_shop_name',
        };

        // When
        const response = await authenticatedRequestAgent
            .post('/shop')
            .send(params);

        // Then
        expect(response.status).toEqual(422);
        expect(response.body).toEqual({
            message: "bad fields [ 'handle' ]",
            meta: {
                fields: ['handle'],
            },
        });
    });

    test('does not create 2 shops for the same user', async () => {
        // Given
        const authenticatedRequestAgent = await createAuthenticatedRequestAgent(
            databaseClient,
            endToEndApplication,
        );
        const params = {
            handle: 'the_duplicated_shop_handle',
            name: 'the_duplicated_shop_name',
        };

        // When
        const firstResponse = await authenticatedRequestAgent
            .post('/shop')
            .send(params);
        const secondResponse = await authenticatedRequestAgent
            .post('/shop')
            .send(params);

        // Then
        expect(firstResponse.status).toEqual(201);
        expect(secondResponse.status).toEqual(403);
        expect(secondResponse.body).toEqual({
            message: 'a user cannot create 2 shops',
        });
    });

    test('does not create a shop that is missing required information', async () => {
        // Given
        const params = {
            handle: 'the_shop_handle_missing_name',
        };

        // When
        await request(endToEndApplication.app.callback())
            .post('/shop')
            .send(params);
        const secondResponse = await request(endToEndApplication.app.callback())
            .post('/shop')
            .send(params);

        // Then
        expect(secondResponse.status).toEqual(422);
        expect(secondResponse.body).toEqual({
            message: "bad fields [ 'name' ]",
            meta: {
                fields: ['name'],
            },
        });
    });
});
