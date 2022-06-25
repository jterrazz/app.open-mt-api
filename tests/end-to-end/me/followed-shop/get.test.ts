import { createEndToEndApplication } from '@tests/utils/create-end-to-end-application';
import { seedDatabaseWithShopsFollowers } from '@tests/seeds/seed-database-with-shop-followers';

const { createAuthenticatedRequestAgent, database, requestAgent } =
    createEndToEndApplication();

describe('END TO END - GET /me/followed-shops', () => {
    test('returns the array of shops that a user is following', async () => {
        // Given
        const { authenticatedRequestAgent, seededUser } =
            await createAuthenticatedRequestAgent();

        const { shop } = await seedDatabaseWithShopsFollowers(
            database.client,
            seededUser.id,
        );

        // When
        const response = await authenticatedRequestAgent.get(
            '/me/followed-shops',
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            followedShops: [
                {
                    description: shop?.description,
                    handle: shop?.handle,
                    name: shop?.name,
                },
            ],
        });
    });

    test('returns empty array when user has no followed shops', async () => {
        // Given
        const { authenticatedRequestAgent } =
            await createAuthenticatedRequestAgent();

        // When
        const response = await authenticatedRequestAgent.get(
            '/me/followed-shops',
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            followedShops: [],
        });
    });

    test('returns 401 status when user is not authenticated', async () => {
        // Given

        // When
        const response = await requestAgent.get('/me/followed-shops');

        // Then
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
            message: 'authentication required',
        });
    });
});
