import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';
import { seedDatabaseWithShop } from '@tests/seeds/seed-database-with-shop';

const { requestAgent, createAuthenticatedRequestAgent, database } =
    createEndToEndApplication();

describe('END TO END - POST /shops', function () {
    test('creates a new shop', async () => {
        // Given
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();
        const params = {
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        };

        // When
        const response = await authenticatedRequestAgent
            .post('/shops')
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
        const response = await requestAgent.post('/shops').send(params);

        // Then
        expect(response.status).toEqual(401);
    });

    test('does not create a shop with an handle already existing', async () => {
        // Given
        const { shop: seededShop } = await seedDatabaseWithShop(
            database.client,
        );
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();
        const params = {
            handle: seededShop.handle,
            name: 'the_duplicated_shop_name',
        };

        // When
        const response = await authenticatedRequestAgent
            .post('/shops')
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
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();
        const params = {
            handle: 'the_duplicated_shop_handle',
            name: 'the_duplicated_shop_name',
        };

        // When
        const firstResponse = await authenticatedRequestAgent
            .post('/shops')
            .send(params);
        const secondResponse = await authenticatedRequestAgent
            .post('/shops')
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
            handle: 'the_shop_handle_with_missing_name',
        };

        // When
        const response = await requestAgent.post('/shops').send(params);

        // Then
        expect(response.status).toEqual(422);
        expect(response.body).toEqual({
            message: "bad fields [ 'name' ]",
            meta: {
                fields: ['name'],
            },
        });
    });
});
