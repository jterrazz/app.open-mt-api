import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';
import { seedDatabaseWithShop } from '@tests/seeds/seed-database-with-shop';

const { createAuthenticatedRequestAgent, database, requestAgent } =
    createEndToEndApplication();

describe('END TO END - POST /products', () => {
    test('creates a product', async () => {
        // Given
        const { authenticatedRequestAgent, seededUser } =
            await createAuthenticatedRequestAgent();
        await seedDatabaseWithShop(database.client, {}, seededUser.id);
        const product = {
            name: 'test-product',
            priceCentsAmount: 100,
            priceCurrency: 'EUR',
        };

        // When
        const response = await authenticatedRequestAgent
            .post('/products')
            .send(product);

        // Then
        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            id: expect.any(Number),
            ...product,
        });
    });

    test('returns a 401 status code when not authenticated', async () => {
        // Given
        const product = {
            name: 'test-product',
            priceCentsAmount: 100,
            priceCurrency: 'EUR',
        };

        // When
        const response = await requestAgent.post('/products').send(product);

        // Then
        expect(response.status).toEqual(401);
    });
});
